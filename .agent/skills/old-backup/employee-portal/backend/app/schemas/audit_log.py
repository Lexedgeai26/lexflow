from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional, Any, Dict

class AuditLogBase(BaseModel):
    action: str
    entity_type: str
    entity_id: Optional[UUID] = None
    changes: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None

class AuditLogCreate(AuditLogBase):
    user_id: Optional[UUID] = None

class AuditLog(AuditLogBase):
    id: UUID
    user_id: Optional[UUID] = None
    created_at: datetime

    class Config:
        from_attributes = True
