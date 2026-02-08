"""
Main entry point for the Employee Management Portal backend.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import auth, employees, departments, documents, audit_logs

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="A centralized portal for managing employees and documentation."
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(employees.router, prefix="/api/v1")
app.include_router(departments.router, prefix="/api/v1")
app.include_router(documents.router, prefix="/api/v1")
app.include_router(audit_logs.router, prefix="/api/v1")


@app.get("/health", tags=["health"])
async def health_check():
    """Health check endpoint to verify API operation."""
    return {
        "status": "online",
        "app_name": settings.APP_NAME,
        "version": settings.APP_VERSION
    }


@app.get("/", tags=["root"])
async def root():
    """Root endpoint with link to documentation."""
    return {
        "message": "Welcome to the Employee Management Portal API",
        "docs_url": "/docs"
    }
