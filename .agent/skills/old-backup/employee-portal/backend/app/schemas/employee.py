"""
Pydantic schemas for Employee data.
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime, date
from uuid import UUID


class EmployeeBase(BaseModel):
    """Base employee attributes."""
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    date_of_birth: Optional[date] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None
    
    department_id: Optional[UUID] = None
    position: Optional[str] = None
    hire_date: date
    status: str = "active"
    manager_id: Optional[UUID] = None


class EmployeeCreate(EmployeeBase):
    """Attributes required to create an employee record."""
    employee_id: str
    salary: Optional[float] = None
    user_id: Optional[UUID] = None


class EmployeeUpdate(BaseModel):
    """Attributes that can be updated for an employee."""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    date_of_birth: Optional[date] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None
    
    department_id: Optional[UUID] = None
    position: Optional[str] = None
    hire_date: Optional[date] = None
    status: Optional[str] = None
    manager_id: Optional[UUID] = None
    salary: Optional[float] = None


class EmployeeRead(EmployeeBase):
    """Schema for reading employee details."""
    id: UUID
    employee_id: str
    # Note: salary is only returned if authorized, handled in service/router
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class EmployeeList(BaseModel):
    """Schema for paginated employee list."""
    data: List[EmployeeRead]
    total: int
    page: int
    limit: int
    pages: int
