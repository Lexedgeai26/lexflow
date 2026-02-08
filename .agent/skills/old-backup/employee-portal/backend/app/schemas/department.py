"""
Pydantic schemas for Department data.
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID


class DepartmentBase(BaseModel):
    """Base department attributes."""
    name: str
    description: Optional[str] = None


class DepartmentCreate(DepartmentBase):
    """Attributes required to create a department."""
    pass


class DepartmentUpdate(BaseModel):
    """Attributes that can be updated for a department."""
    name: Optional[str] = None
    description: Optional[str] = None


class DepartmentRead(DepartmentBase):
    """Schema for reading department data."""
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
