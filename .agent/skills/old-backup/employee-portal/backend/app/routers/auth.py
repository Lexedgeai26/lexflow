"""
Auth router for authentication endpoints.
"""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.auth import Token, Login
from ..schemas.user import UserCreate, UserRead
from ..services.auth_service import AuthService
from ..utils.security import create_access_token
from ..dependencies import get_current_user
from ..models.user import User

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate, db: Session = Depends(get_db)):
    """Register a new user."""
    return await AuthService.register_user(db, user_in)


from fastapi.security import OAuth2PasswordRequestForm

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Authenticate user and return access token."""
    login_data = Login(email=form_data.username, password=form_data.password)
    user = await AuthService.authenticate_user(db, login_data)
    
    # Create token payload
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "role": str(user.role)}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }


@router.get("/me", response_model=UserRead)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get currently authenticated user's profile."""
    return current_user
