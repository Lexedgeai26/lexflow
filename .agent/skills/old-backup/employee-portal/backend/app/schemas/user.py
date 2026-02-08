"""
Pydantic schemas for User data.
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from uuid import UUID


class UserBase(BaseModel):
    """Base user attributes."""
    email: EmailStr


class UserCreate(UserBase):
    """Attributes required to create a user."""
    password: str = Field(..., min_length=8)
    role: str = "employee"


class UserUpdate(BaseModel):
    """Attributes that can be updated for a user."""
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=8)
    role: Optional[str] = None
    is_active: Optional[bool] = None


class UserRead(UserBase):
    """Schema for reading user data."""
    id: UUID
    role: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class User(UserRead):
    """Full user schema including related data if needed."""
    pass
