"""
Employee service for handling personnel business logic.
"""

from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, func
from datetime import datetime
from uuid import UUID

from ..models.employee import Employee
from ..schemas.employee import EmployeeCreate, EmployeeUpdate
from ..utils.encryption import encrypt_data, decrypt_data
from .audit_service import AuditService


class EmployeeService:
    @staticmethod
    async def create_employee(db: Session, employee_in: EmployeeCreate, user_id: UUID) -> Employee:
        """Create a new employee record with encrypted salary."""
        # Check if email or employee_id exists (including soft-deleted)
        existing = db.query(Employee).filter(
            or_(Employee.email == employee_in.email, 
                Employee.employee_id == employee_in.employee_id)
        ).first()
        
        if existing:
            # Handle collision logic if needed
            pass
            
        # Encrypt salary if provided
        salary_encrypted = None
        if employee_in.salary:
            salary_encrypted = encrypt_data(str(employee_in.salary))

        db_employee = Employee(
            **employee_in.model_dump(exclude={"salary"}),
            salary_encrypted=salary_encrypted
        )
        
        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)
        
        # Audit Log
        await AuditService.log_action(
            db,
            user_id=user_id,
            action="create",
            entity_type="employee",
            entity_id=db_employee.id,
            changes={"new": employee_in.model_dump(exclude={"salary"})}
        )
        
        return db_employee

    @staticmethod
    async def get_employees(
        db: Session, 
        skip: int = 0, 
        limit: int = 20,
        search: Optional[str] = None,
        department_id: Optional[UUID] = None,
        status: Optional[str] = None
    ) -> Tuple[List[Employee], int]:
        """List employees with pagination and optional filtering."""
        query = db.query(Employee).filter(Employee.deleted_at == None)

        if search:
            search_query = f"%{search}%"
            query = query.filter(
                or_(
                    Employee.first_name.ilike(search_query),
                    Employee.last_name.ilike(search_query),
                    Employee.email.ilike(search_query),
                    Employee.employee_id.ilike(search_query)
                )
            )

        if department_id:
            query = query.filter(Employee.department_id == department_id)
        
        if status:
            query = query.filter(Employee.status == status)

        total = query.count()
        employees = query.order_by(Employee.created_at.desc()).offset(skip).limit(limit).all()
        
        return employees, total

    @staticmethod
    async def get_employee_by_id(db: Session, employee_id: UUID) -> Optional[Employee]:
        """Retrieve a single employee, decrypting sensitive data if viewable."""
        employee = db.query(Employee).filter(
            Employee.id == employee_id, 
            Employee.deleted_at == None
        ).first()
        
        if employee and employee.salary_encrypted:
            # We store the decrypted value in a temporary attribute for the schema to pick up
            employee.salary = float(decrypt_data(employee.salary_encrypted))
        
        return employee

    @staticmethod
    async def update_employee(db: Session, employee_id: UUID, employee_in: EmployeeUpdate, user_id: UUID) -> Optional[Employee]:
        """Update an employee record."""
        db_employee = await EmployeeService.get_employee_by_id(db, employee_id)
        if not db_employee:
            return None

        update_data = employee_in.model_dump(exclude_unset=True)
        old_data = {field: getattr(db_employee, field) for field in update_data.keys() if field != "salary"}
        
        if "salary" in update_data:
            update_data["salary_encrypted"] = encrypt_data(str(update_data.pop("salary")))

        for field, value in update_data.items():
            setattr(db_employee, field, value)

        db.commit()
        db.refresh(db_employee)
        
        # Audit Log
        await AuditService.log_action(
            db,
            user_id=user_id,
            action="update",
            entity_type="employee",
            entity_id=db_employee.id,
            changes={"old": old_data, "new": update_data}
        )
        
        return db_employee

    @staticmethod
    async def delete_employee(db: Session, employee_id: UUID, user_id: UUID) -> bool:
        """Soft delete an employee."""
        db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
        if not db_employee:
            return False
            
        db_employee.deleted_at = func.now()
        db_employee.status = "archived"
        db.commit()
        
        # Audit Log
        await AuditService.log_action(
            db,
            user_id=user_id,
            action="delete",
            entity_type="employee",
            entity_id=employee_id
        )
        
        return True
