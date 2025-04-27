from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# 📥 Schema for creating a resource
class ResourceCreate(BaseModel):
    title: str
    description: str
    link: str
    type: str  # pdf, video, image, etc.

# 📤 Schema for reading (response) a resource
class ResourceRead(BaseModel):
    id: int
    title: str
    description: str
    link: str
    type: str
    created_at: datetime

    class Config:
        orm_mode = True  # Tells Pydantic to read data from SQLAlchemy/SQLModel models

# 🛠️ Schema for updating a resource
class ResourceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    link: Optional[str] = None
    type: Optional[str] = None

