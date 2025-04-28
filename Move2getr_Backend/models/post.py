# Post model here

from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
import uuid

class Post(SQLModel, table=True):
    post_id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    title: str
    content: str
    user_id: str = Field(foreign_key="account.user_id")
    group_id: Optional[str] = Field(default=None, foreign_key="group.group_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    vote_score: Optional[int] = 0
