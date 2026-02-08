"""
AuditLog model for tracking system activities and changes.
"""

from sqlalchemy import Column, String, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from ..database import Base


class AuditLog(Base):
    """AuditLog model for activity tracking."""
    
    __tablename__ = "audit_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    
    action = Column(String(100), nullable=False) # create, update, delete, login, etc.
    entity_type = Column(String(100), nullable=False) # employee, document, etc.
    entity_id = Column(UUID(as_uuid=True), nullable=True) # ID of the affected entity
    
    changes = Column(JSON, nullable=True) # Store before/after state as JSON
    ip_address = Column(String(50))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    
    # Relationships
    user = relationship("User", back_populates="audit_logs")
    
    def __repr__(self):
        return f"<AuditLog {self.action} on {self.entity_type} at {self.created_at}>"
