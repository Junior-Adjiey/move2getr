from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PostCreate(BaseModel):
    title: str
    content: str
    group_id: Optional[str] = None

class PostRead(PostCreate):
    post_id: str
    author_id: str
    created_at: datetime
    
class PostRead(PostCreate):
    post_id: str
    author_id: str
    created_at: datetime
    upvotes: int = 0
    downvotes: int = 0
    vote_score: Optional[int] = 0  # 🆕 Added field

