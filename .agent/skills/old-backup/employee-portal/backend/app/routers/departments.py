"""
Department router for managing organizational units.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from ..database import get_db
from ..schemas.department import DepartmentRead, DepartmentCreate, DepartmentUpdate
from ..services.department_service import DepartmentService
from ..dependencies import get_current_user, check_role
from ..models.user import User, UserRole

router = APIRouter(prefix="/departments", tags=["departments"])


@router.get("/", response_model=List[DepartmentRead])
async def list_departments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all departments."""
    return await DepartmentService.get_departments(db)


@router.post("/", response_model=DepartmentRead, status_code=status.HTTP_201_CREATED)
async def create_department(
    dept_in: DepartmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role([UserRole.ADMIN]))
):
    """Create a new department (Admin only)."""
    return await DepartmentService.create_department(db, dept_in, user_id=current_user.id)


@router.patch("/{dept_id}", response_model=DepartmentRead)
async def update_department(
    dept_id: UUID,
    dept_in: DepartmentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role([UserRole.ADMIN]))
):
    """Update department details (Admin only)."""
    dept = await DepartmentService.update_department(db, dept_id, dept_in, user_id=current_user.id)
    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")
    return dept


@router.delete("/{dept_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_department(
    dept_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role([UserRole.ADMIN]))
):
    """Delete a department (Admin only)."""
    success = await DepartmentService.delete_department(db, dept_id, user_id=current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Department not found")
    return None
