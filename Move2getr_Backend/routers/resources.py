# Resource upload routes here
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def read_posts():
    return {"message": "Posts route is working!"}
