from pydantic import BaseModel
from datetime import datetime

class CommentCreate(BaseModel):
    content: str

class CommentRead(CommentCreate):
    comment_id: str
    post_id: str
    author_id: str
    created_at: datetime
