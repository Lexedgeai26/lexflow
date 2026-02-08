"""
Pydantic schemas for authentication and tokens.
"""

from pydantic import BaseModel, EmailStr
from typing import Optional


class Login(BaseModel):
    """Schema for login request."""
    email: EmailStr
    password: str


from .user import UserRead

class Token(BaseModel):
    """Schema for access token response."""
    access_token: str
    token_type: str = "bearer"
    user: UserRead


class TokenData(BaseModel):
    """Schema for data stored within the token."""
    user_id: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None
