from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from db import get_session
from models.post import Post
from models.comment import Comment
from models.vote import PostVote
from models.account import Account
from schemas.post import PostCreate, PostRead
from schemas.comment import CommentCreate, CommentRead
from routers.auth import get_current_user
from typing import List  # Python standard typing
from dependencies.admin import require_admin
from dependencies.auth_utils import require_admin



router = APIRouter(prefix="/posts", tags=["Posts"])

# 📌 Create a new post
@router.get("/", response_model=List[PostRead])  # ✅
def create_post(
    post_data: PostCreate,
    current_user: Account = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    post = Post(**post_data.dict(), author_id=current_user.user_id)
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

# 📋 List all posts with optional filters and sorting
@router.get("/", response_model=List[PostRead])  # ✅
def list_posts(session: Session = Depends(get_session)):
    posts = session.exec(select(Post).order_by(Post.created_at.desc())).all()
    post_ids = [post.id for post in posts]

    # Get votes grouped by post
    vote_rows = session.exec(select(PostVote)).all()
    vote_map = {}
    for vote in vote_rows:
        vote_map.setdefault(vote.post_id, []).append(vote.vote_type)

    for post in posts:
        votes = vote_map.get(post.id, [])
        post.vote_score = votes.count("up") - votes.count("down")

    return posts


# 💬 Post a comment
@router.post("/{post_id}/comments", response_model=CommentRead)
def comment_post(
    post_id: str,
    comment_data: CommentCreate,
    current_user: Account = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    comment = Comment(
        content=comment_data.content,
        post_id=post_id,
        author_id=current_user.user_id
    )
    session.add(comment)
    session.commit()
    session.refresh(comment)
    return comment

# 📜 Get comments for a post
@router.get("/{post_id}/comments", response_model=list[CommentRead])
def get_comments(post_id: str, session: Session = Depends(get_session)):
    return session.exec(
        select(Comment).where(Comment.post_id == post_id).order_by(Comment.created_at.asc())
    ).all()

# 👍 Upvote a post
@router.post("/{post_id}/vote")
def vote_post(
    post_id: str,
    vote_type: str = Query(..., regex="^(up|down)$"),
    current_user: Account = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    existing_vote = session.exec(
        select(PostVote).where(
            (PostVote.user_id == current_user.user_id) &
            (PostVote.post_id == post_id)
        )
    ).first()

    if existing_vote:
        existing_vote.vote_type = vote_type  # allow changing
    else:
        existing_vote = PostVote(user_id=current_user.user_id, post_id=post_id, vote_type=vote_type)
        session.add(existing_vote)

    session.commit()
    return {"message": f"Voted '{vote_type}' successfully"}

@router.get("/{post_id}/votes")
def count_votes(post_id: str, session: Session = Depends(get_session)):
    upvotes = session.exec(select(PostVote).where((PostVote.post_id == post_id) & (PostVote.vote_type == "up"))).count()
    downvotes = session.exec(select(PostVote).where((PostVote.post_id == post_id) & (PostVote.vote_type == "down"))).count()
    return {"post_id": post_id, "upvotes": upvotes, "downvotes": downvotes}

@router.get("/{post_id}", response_model=PostRead)
def get_post_detail(post_id: str, session: Session = Depends(get_session)):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    # Count votes
    votes = session.exec(
        select(PostVote).where(PostVote.post_id == post_id)
    ).all()
    post.vote_score = votes.count("up") - votes.count("down")

    return post

@router.delete("/{post_id}")
def delete_post(post_id: str, session: Session = Depends(get_session), current_user: Account = Depends(require_admin)):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    session.delete(post)
    session.commit()
    return {"detail": "Post deleted"}


