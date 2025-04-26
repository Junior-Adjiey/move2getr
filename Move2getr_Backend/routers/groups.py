# Group routes here

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from db import get_session
from models.group import Group
from models.account import Account
from models.membership import GroupMembership
from schemas.group import GroupCreate, GroupRead
from routers.auth import get_current_user
from dependencies.dependencies import require_admin
from dependencies.auth_utils import require_admin


router = APIRouter(prefix="/groups", tags=["Groups"])

# Create a new group
@router.post("/", response_model=GroupRead)
def create_group(group_data: GroupCreate, session: Session = Depends(get_session), current_user: Account = Depends(get_current_user)):
    group = Group(**group_data.dict(), creator_id=current_user.user_id)
    session.add(group)
    session.commit()
    session.refresh(group)

    # Optional: auto join creator to group
    membership = GroupMembership(user_id=current_user.user_id, group_id=group.group_id)
    session.add(membership)
    session.commit()

    return group

# List all groups
@router.get("/", response_model=list[GroupRead])
def list_groups(session: Session = Depends(get_session)):
    return session.exec(select(Group)).all()

# Join a group
@router.post("/{group_id}/join")
def join_group(group_id: str, session: Session = Depends(get_session), current_user: Account = Depends(get_current_user)):
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    already_member = session.exec(
        select(GroupMembership).where(
            (GroupMembership.group_id == group_id) &
            (GroupMembership.user_id == current_user.user_id)
        )
    ).first()
    if already_member:
        raise HTTPException(status_code=400, detail="Already a member")

    membership = GroupMembership(user_id=current_user.user_id, group_id=group_id)
    session.add(membership)
    session.commit()
    return {"message": "Joined group successfully"}

# Leave a group
@router.post("/{group_id}/leave")
def leave_group(group_id: str, session: Session = Depends(get_session), current_user: Account = Depends(get_current_user)):
    membership = session.exec(
        select(GroupMembership).where(
            (GroupMembership.group_id == group_id) &
            (GroupMembership.user_id == current_user.user_id)
        )
    ).first()
    if not membership:
        raise HTTPException(status_code=400, detail="Not a member of this group")

    session.delete(membership)
    session.commit()
    return {"message": "Left group successfully"}


from models.message import Message
from schemas.message import MessageCreate, MessageRead

# List members of a group
@router.get("/{group_id}/members")
def group_members(group_id: str, session: Session = Depends(get_session)):
    members = session.exec(
        select(Account).join(GroupMembership).where(GroupMembership.group_id == group_id)
    ).all()
    return members

# Update group info (only creator)
@router.put("/{group_id}")
def update_group(group_id: str, group_data: GroupCreate, current_user: Account = Depends(get_current_user), session: Session = Depends(get_session)):
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    if group.creator_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Only the creator can update this group")

    group.group_name = group_data.group_name
    group.description = group_data.description
    session.add(group)
    session.commit()
    session.refresh(group)
    return group

# Delete group (only creator)
@router.delete("/{group_id}")
def delete_group(group_id: str, session: Session = Depends(get_session), current_user: Account = Depends(require_admin)):
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    session.delete(group)
    session.commit()
    return {"detail": "Group deleted"}


# Post a message to group
@router.post("/{group_id}/messages", response_model=MessageRead)
def post_message(group_id: str, data: MessageCreate, current_user: Account = Depends(get_current_user), session: Session = Depends(get_session)):
    msg = Message(
        content=data.content,
        sender_id=current_user.user_id,
        group_id=group_id
    )
    session.add(msg)
    session.commit()
    session.refresh(msg)
    return msg

# List messages in a group
@router.get("/{group_id}/messages", response_model=list[MessageRead])
def list_messages(group_id: str, session: Session = Depends(get_session)):
    return session.exec(
        select(Message).where(Message.group_id == group_id)
    ).all()


