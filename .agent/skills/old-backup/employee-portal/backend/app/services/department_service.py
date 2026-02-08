"""
Department service for managing organizational structures.
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from uuid import UUID

from ..models.department import Department
from ..schemas.department import DepartmentCreate, DepartmentUpdate
from .audit_service import AuditService


class DepartmentService:
    @staticmethod
    async def create_department(db: Session, department_in: DepartmentCreate, user_id: UUID) -> Department:
        """Create a new department."""
        db_dept = Department(**department_in.model_dump())
        db.add(db_dept)
        db.commit()
        db.refresh(db_dept)
        
        await AuditService.log_action(
            db,
            user_id=user_id,
            action="create",
            entity_type="department",
            entity_id=db_dept.id,
            changes={"new": department_in.model_dump()}
        )
        
        return db_dept

    @staticmethod
    async def get_departments(db: Session) -> List[Department]:
        """List all departments."""
        return db.query(Department).order_by(Department.name.asc()).all()

    @staticmethod
    async def get_department_by_id(db: Session, dept_id: UUID) -> Optional[Department]:
        """Get department by ID."""
        return db.query(Department).filter(Department.id == dept_id).first()

    @staticmethod
    async def update_department(db: Session, dept_id: UUID, dept_in: DepartmentUpdate, user_id: UUID) -> Optional[Department]:
        """Update department details."""
        db_dept = await DepartmentService.get_department_by_id(db, dept_id)
        if not db_dept:
            return None
            
        update_data = dept_in.model_dump(exclude_unset=True)
        old_data = {field: getattr(db_dept, field) for field in update_data.keys()}
        
        for field, value in update_data.items():
            setattr(db_dept, field, value)
            
        db.commit()
        db.refresh(db_dept)
        
        await AuditService.log_action(
            db,
            user_id=user_id,
            action="update",
            entity_type="department",
            entity_id=db_dept.id,
            changes={"old": old_data, "new": update_data}
        )
        
        return db_dept

    @staticmethod
    async def delete_department(db: Session, dept_id: UUID, user_id: UUID) -> bool:
        """Delete a department if it has no active employees."""
        db_dept = await DepartmentService.get_department_by_id(db, dept_id)
        if not db_dept:
            return False
            
        db.delete(db_dept)
        db.commit()
        
        await AuditService.log_action(
            db,
            user_id=user_id,
            action="delete",
            entity_type="department",
            entity_id=dept_id
        )
        
        return True
