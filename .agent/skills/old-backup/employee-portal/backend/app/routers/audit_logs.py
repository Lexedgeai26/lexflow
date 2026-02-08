from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from ..database import get_db
from ..services.audit_service import AuditService
from ..schemas.audit_log import AuditLog
from ..dependencies import get_current_user, check_role
from ..models.user import UserRole

router = APIRouter(prefix="/audit-logs", tags=["Audit Logs"])

@router.get("/", response_model=List[AuditLog])
async def list_logs(
    entity_type: Optional[str] = None,
    entity_id: Optional[UUID] = None,
    user_id: Optional[UUID] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(check_role([UserRole.ADMIN, UserRole.MANAGER]))
):
    """List audit logs with filtering."""
    return await AuditService.get_logs(
        db, 
        entity_type=entity_type, 
        entity_id=entity_id, 
        user_id=user_id, 
        skip=skip, 
        limit=limit
    )

@router.get("/entity/{entity_type}/{entity_id}", response_model=List[AuditLog])
async def get_entity_logs(
    entity_type: str,
    entity_id: UUID,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get logs for a specific entity."""
    # Logic for entity logs (e.g., employee details activity tab)
    return await AuditService.get_logs(db, entity_type=entity_type, entity_id=entity_id)
