"""
Auth service for handling user authentication logic.
"""

from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from ..models.user import User
from ..schemas.user import UserCreate
from ..schemas.auth import Login
from ..utils.security import hash_password, verify_password


class AuthService:
    """Service class for authentication operations."""
    
    @staticmethod
    async def register_user(db: Session, user_in: UserCreate) -> User:
        """Register a new user."""
        # Check if email exists
        if db.query(User).filter(User.email == user_in.email).first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A user with this email already exists."
            )
        
        # Create user
        db_user = User(
            email=user_in.email,
            password_hash=hash_password(user_in.password),
            role=user_in.role
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    async def authenticate_user(db: Session, login_data: Login) -> User:
        """Authenticate a user by email and password."""
        user = db.query(User).filter(User.email == login_data.email).first()
        if not user or not verify_password(login_data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user"
            )
            
        return user
