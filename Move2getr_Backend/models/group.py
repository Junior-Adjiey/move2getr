# Group model here

# models/group.py
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid

class Group(SQLModel, table=True):
    group_id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    group_name: str
    description: Optional[str] = None
    creator_id: str  # new field to link to Account.user_id
    created_at: datetime = Field(default_factory=datetime.utcnow)





