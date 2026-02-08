from sqlalchemy.orm import Session
from ..models.audit_log import AuditLog
from ..schemas.audit_log import AuditLogCreate
from uuid import UUID
from typing import List, Optional

class AuditService:
    @staticmethod
    async def create_log(
        db: Session, 
        audit_data: AuditLogCreate
    ) -> AuditLog:
        """Create a new audit log record."""
        db_log = AuditLog(**audit_data.model_dump())
        db.add(db_log)
        db.commit()
        db.refresh(db_log)
        return db_log

    @staticmethod
    async def get_logs(
        db: Session, 
        entity_type: Optional[str] = None,
        entity_id: Optional[UUID] = None,
        user_id: Optional[UUID] = None,
        skip: int = 0, 
        limit: int = 100
    ) -> List[AuditLog]:
        """Retrieve audit logs with optional filters."""
        query = db.query(AuditLog)
        
        if entity_type:
            query = query.filter(AuditLog.entity_type == entity_type)
        if entity_id:
            query = query.filter(AuditLog.entity_id == entity_id)
        if user_id:
            query = query.filter(AuditLog.user_id == user_id)
            
        return query.order_by(AuditLog.created_at.desc()).offset(skip).limit(limit).all()

    @staticmethod
    def _convert_uuids(obj):
        """Recursively convert UUIDs to strings for JSON serialization."""
        if isinstance(obj, UUID):
            return str(obj)
        elif isinstance(obj, dict):
            return {k: AuditService._convert_uuids(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [AuditService._convert_uuids(i) for i in obj]
        return obj

    @staticmethod
    async def log_action(
        db: Session,
        user_id: UUID,
        action: str,
        entity_type: str,
        entity_id: Optional[UUID] = None,
        changes: Optional[dict] = None,
        ip_address: Optional[str] = None
    ):
        """Helper method to log an action easily."""
        # Ensure changes dict is JSON serializable (convert UUIDs)
        if changes:
            changes = AuditService._convert_uuids(changes)
            
        log_data = AuditLogCreate(
            user_id=user_id,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            changes=changes,
            ip_address=ip_address
        )
        return await AuditService.create_log(db, log_data)
