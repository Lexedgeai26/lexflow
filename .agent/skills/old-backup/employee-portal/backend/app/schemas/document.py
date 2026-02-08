"""
Pydantic schemas for Document metadata records.
"""

from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID


class DocumentBase(BaseModel):
    """Base document attributes."""
    category: str
    file_name: str
    file_type: str
    file_size: int


class DocumentCreate(DocumentBase):
    """Attributes required to record a document upload."""
    employee_id: UUID
    file_path: str
    uploaded_by: UUID


class DocumentRead(DocumentBase):
    """Schema for reading document records."""
    id: UUID
    employee_id: UUID
    uploaded_by: UUID
    uploaded_at: datetime
    
    class Config:
        from_attributes = True
