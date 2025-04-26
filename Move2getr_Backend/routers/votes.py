from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from db import get_session
from models.vote import PostVote
from models.post import Post
from models.account import Account
from routers.auth import get_current_user

router = APIRouter(prefix="/votes", tags=["Votes"])

@router.post("/{post_id}/{vote_type}")
def vote_post(post_id: str, vote_type: str, session: Session = Depends(get_session), current_user: Account = Depends(get_current_user)):
    if vote_type not in ["up", "down"]:
        raise HTTPException(status_code=400, detail="Invalid vote type. Use 'up' or 'down'.")

    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found.")

    existing_vote = session.exec(
        select(PostVote).where(PostVote.post_id == post_id, PostVote.user_id == current_user.user_id)
    ).first()

    if existing_vote:
        if existing_vote.vote_type == vote_type:
            session.delete(existing_vote)
            session.commit()
            return {"detail": f"{vote_type}vote removed."}
        else:
            existing_vote.vote_type = vote_type
            session.add(existing_vote)
            session.commit()
            return {"detail": f"Vote switched to {vote_type}."}

    vote = PostVote(post_id=post_id, user_id=current_user.user_id, vote_type=vote_type)
    session.add(vote)
    session.commit()
    return {"detail": f"{vote_type}vote added."}

@router.get("/{post_id}/count")
def get_vote_count(post_id: str, session: Session = Depends(get_session)):
    upvotes = session.exec(
        select(PostVote).where(PostVote.post_id == post_id, PostVote.vote_type == "up")
    ).all()
    downvotes = session.exec(
        select(PostVote).where(PostVote.post_id == post_id, PostVote.vote_type == "down")
    ).all()

    return {
        "post_id": post_id,
        "upvotes": len(upvotes),
        "downvotes": len(downvotes),
        "score": len(upvotes) - len(downvotes)
    }
