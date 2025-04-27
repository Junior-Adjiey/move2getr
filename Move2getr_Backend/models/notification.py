# Notification model here
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Notification(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str  # Who receives the notification
    content: str  # Text like "Bob liked your post" or "Alice sent you a message"
    is_read: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
