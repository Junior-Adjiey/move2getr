from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class GroupCreate(BaseModel):
    group_name: str
    description: Optional[str] = None

class GroupRead(GroupCreate):
    group_id: str
    creator_id: str
    created_at: datetime



