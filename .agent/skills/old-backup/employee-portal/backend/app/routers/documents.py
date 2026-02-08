"""
Document router for file uploads and management.
"""

import os
import shutil
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from ..database import get_db
from ..schemas.document import DocumentRead
from ..models.document import Document
from ..models.employee import Employee
from ..dependencies import get_current_user
from ..models.user import User
from ..config import settings
from ..services.audit_service import AuditService

router = APIRouter(prefix="/documents", tags=["documents"])

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)


@router.post("/upload", response_model=DocumentRead, status_code=status.HTTP_201_CREATED)
async def upload_document(
    employee_id: UUID = Form(...),
    category: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Upload a document for an employee."""
    # Verify employee exists
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    # Generate unique filename
    file_ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(settings.UPLOAD_DIR, unique_filename)
    
    # Save file to disk
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not save file: {str(e)}")
        
    # Create database record
    db_doc = Document(
        employee_id=employee_id,
        category=category,
        file_name=file.filename,
        file_path=file_path,
        file_size=os.path.getsize(file_path),
        file_type=file.content_type,
        uploaded_by=current_user.id
    )
    
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    
    # Audit Log
    await AuditService.log_action(
        db,
        user_id=current_user.id,
        action="upload",
        entity_type="document",
        entity_id=db_doc.id,
        changes={"file_name": file.filename, "category": category, "employee_id": str(employee_id)}
    )
    
    return db_doc


@router.get("/employee/{employee_id}", response_model=List[DocumentRead])
async def list_employee_documents(
    employee_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all documents for a specific employee."""
    return db.query(Document).filter(
        Document.employee_id == employee_id,
        Document.deleted_at == None
    ).all()


@router.get("/{document_id}/download")
async def download_document(
    document_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Download a document by ID."""
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
        
    if not os.path.exists(doc.file_path):
        raise HTTPException(status_code=404, detail="Physical file not found")
    
    # Audit Log Download
    await AuditService.log_action(
        db,
        user_id=current_user.id,
        action="download",
        entity_type="document",
        entity_id=document_id
    )
        
    return FileResponse(
        path=doc.file_path,
        filename=doc.file_name,
        media_type=doc.file_type
    )


@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    document_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a document (metadata remains, file on disk remains for audit)."""
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
        
    from sqlalchemy.sql import func
    doc.deleted_at = func.now()
    db.commit()
    
    # Audit Log Delete
    await AuditService.log_action(
        db,
        user_id=current_user.id,
        action="delete",
        entity_type="document",
        entity_id=document_id
    )
    
    return None
