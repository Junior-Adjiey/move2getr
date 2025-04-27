# Account model here

from sqlmodel import SQLModel, Field
from uuid import uuid4
from datetime import datetime

class Account(SQLModel, table=True):
    user_id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    email: str
    username: str
    password: str
    name: str
    surname: str
    nationality: str
    age: int
    gender: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_admin: bool = Field(default=False)  # 👈 this is the new field

