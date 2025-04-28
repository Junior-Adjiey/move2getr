# Message model here
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid

class Message(SQLModel, table=True):
    message_id: Optional[int] = Field(default=None, primary_key=True)  # 🔥 primary_key=True
    sender_username: str
    receiver_username: Optional[str] = None
    content_encrypted: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    is_read: bool = Field(default=False)
    group_name: Optional[str] = None


