"""
Employee router for personnel management endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID

from ..database import get_db
from ..schemas.employee import EmployeeRead, EmployeeCreate, EmployeeUpdate, EmployeeList
from ..services.employee_service import EmployeeService
from ..dependencies import get_current_user, check_role
from ..models.user import User, UserRole

router = APIRouter(prefix="/employees", tags=["employees"])


@router.get("/", response_model=EmployeeList)
async def list_employees(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    department_id: Optional[UUID] = None,
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user)
):
    """List all employees with pagination and filters."""
    skip = (page - 1) * limit
    employees, total = await EmployeeService.get_employees(
        db, skip=skip, limit=limit, search=search, department_id=department_id, status=status
    )
    
    pages = (total + limit - 1) // limit
    return {
        "data": employees,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": pages
    }


@router.post("/", response_model=EmployeeRead, status_code=status.HTTP_201_CREATED)
async def create_employee(
    employee_in: EmployeeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role([UserRole.ADMIN, UserRole.MANAGER]))
):
    """Create a new employee record (Admin/Manager only)."""
    return await EmployeeService.create_employee(db, employee_in, user_id=current_user.id)


@router.get("/{employee_id}", response_model=EmployeeRead)
async def get_employee(
    employee_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get detailed employee record."""
    employee = await EmployeeService.get_employee_by_id(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    # Check if user has permission to see salary
    if current_user.role not in [UserRole.ADMIN, UserRole.MANAGER] and current_user.email != employee.email:
        employee.salary = None
        
    return employee


@router.patch("/{employee_id}", response_model=EmployeeRead)
async def update_employee(
    employee_id: UUID,
    employee_in: EmployeeUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role([UserRole.ADMIN, UserRole.MANAGER]))
):
    """Update an employee record (Admin/Manager only)."""
    employee = await EmployeeService.update_employee(db, employee_id, employee_in, user_id=current_user.id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee


@router.delete("/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_employee(
    employee_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(check_role([UserRole.ADMIN]))
):
    """Soft delete an employee (Admin only)."""
    success = await EmployeeService.delete_employee(db, employee_id, user_id=current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Employee not found")
    return None
