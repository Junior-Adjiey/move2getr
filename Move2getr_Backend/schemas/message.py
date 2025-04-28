# schemas/message.py
from pydantic import BaseModel
from datetime import datetime

class MessageCreate(BaseModel):
    content: str

class MessageRead(MessageCreate):
    id: int
    sender_id: str
    group_id: str
    sent_at: datetime
