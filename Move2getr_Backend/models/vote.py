from sqlmodel import SQLModel, Field
from typing import Optional
from uuid import uuid4
from datetime import datetime
from enum import Enum


class VoteTypeEnum(str, Enum):
    up = "up"
    down = "down"


class PostVote(SQLModel, table=True):
    id: Optional[str] = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    post_id: str = Field(foreign_key="post.post_id")
    user_id: str = Field(foreign_key="account.user_id")
    vote_type: VoteTypeEnum
    created_at: datetime = Field(default_factory=datetime.utcnow)


