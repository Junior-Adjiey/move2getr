# Comment model here

from sqlmodel import SQLModel, Field
from datetime import datetime
import uuid

class Comment(SQLModel, table=True):
    comment_id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    content: str
    post_id: str = Field(foreign_key="post.post_id")
    author_id: str = Field(foreign_key="account.user_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
