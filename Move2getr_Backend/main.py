import sys
import os
from fastapi.middleware.cors import CORSMiddleware

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from routers import auth, groups, posts, votes, messaging
from sqlmodel import SQLModel
from db import engine
from models.post import Post
from models.comment import Comment
from models.message import Message

app = FastAPI()

# Allow all CORS (fix for localhost 5500 → 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
SQLModel.metadata.create_all(engine)

# Normal routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(groups.router, prefix="/groups", tags=["Groups"])
app.include_router(posts.router, prefix="/posts", tags=["Posts"])
app.include_router(votes.router, prefix="/votes", tags=["Votes"])

# Messaging router WITHOUT prefix
app.include_router(messaging.router)



