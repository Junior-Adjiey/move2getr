from pydantic import BaseModel
from datetime import datetime

class NotificationCreate(BaseModel):
    user_id: str
    content: str

class NotificationRead(BaseModel):
    id: int
    user_id: str
    content: str
    is_read: bool
    created_at: datetime
