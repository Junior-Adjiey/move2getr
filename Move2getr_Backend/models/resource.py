from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

# 📚 Resource model for files, videos, images, etc.
class Resource(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    link: str  # 📎 Link to resource (e.g., URL to a file, video, image)
    type: str  # 📂 Type of the resource ("pdf", "video", "image", "document", etc.)
    created_at: datetime = Field(default_factory=datetime.utcnow)

