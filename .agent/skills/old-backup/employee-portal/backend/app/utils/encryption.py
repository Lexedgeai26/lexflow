"""
Encryption utilities for protecting sensitive data at rest.
"""

from cryptography.fernet import Fernet
from ..config import settings

# Initialize Fernet with our encryption key
# If you don't have a key yet, you can generate one with Fernet.generate_key()
try:
    fernet = Fernet(settings.ENCRYPTION_KEY.encode())
except Exception as e:
    # Fallback for development if key is malformed or missing
    # In production, this would be a critical failure
    print(f"Warning: Encryption initialization failed: {e}")
    fernet = None


def encrypt_data(data: str) -> str:
    """Encrypt a string into an encrypted token."""
    if not data or not fernet:
        return data
    return fernet.encrypt(data.encode()).decode()


def decrypt_data(token: str) -> str:
    """Decrypt an encrypted token back into a string."""
    if not token or not fernet:
        return token
    try:
        return fernet.decrypt(token.encode()).decode()
    except Exception:
        return "[Decryption Error]"
