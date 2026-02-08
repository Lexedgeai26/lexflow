"""
Employee model for storing personal and employment data.
"""

from sqlalchemy import Column, String, Text, DateTime, Date, ForeignKey, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from ..database import Base


class Employee(Base):
    """Employee model for personnel records."""
    
    __tablename__ = "employees"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=True)
    employee_id = Column(String(50), unique=True, nullable=False, index=True)
    
    # Personal Information
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(20))
    date_of_birth = Column(Date)
    address = Column(Text)
    emergency_contact = Column(String(255))
    
    # Employment Information
    department_id = Column(UUID(as_uuid=True), ForeignKey("departments.id", ondelete="SET NULL"), index=True)
    position = Column(String(100))
    hire_date = Column(Date, nullable=False)
    status = Column(String(50), default="active", index=True) # active, on_leave, terminated
    manager_id = Column(UUID(as_uuid=True), ForeignKey("employees.id", ondelete="SET NULL"))
    
    # Encrypted fields
    salary_encrypted = Column(Text)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True, index=True)
    
    # Relationships
    user = relationship("User", back_populates="employee")
    department = relationship("Department", back_populates="employees")
    documents = relationship("Document", back_populates="employee", cascade="all, delete-orphan")
    
    # Hierarchical relationship (Manager -> Employees)
    manager = relationship("Employee", remote_side=[id], backref="subordinates")

    def __repr__(self):
        return f"<Employee {self.first_name} {self.last_name} ({self.employee_id})>"
