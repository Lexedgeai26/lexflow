from app.database import engine, Base
from app.models.user import User
from app.models.department import Department
from app.models.employee import Employee
from app.models.document import Document
from app.models.audit_log import AuditLog

def init_db():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")

if __name__ == "__main__":
    init_db()
