from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from db import get_session
from models.notification import Notification
from schemas.notification import NotificationCreate, NotificationRead
from typing import List

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("/", response_model=List[NotificationRead])
def get_notifications(user_id: str, session: Session = Depends(get_session)):
    notifications = session.exec(
        select(Notification).where(Notification.user_id == user_id).order_by(Notification.created_at.desc())
    ).all()
    return notifications

@router.post("/", response_model=NotificationRead)
def create_notification(notification: NotificationCreate, session: Session = Depends(get_session)):
    new_notification = Notification(**notification.dict())
    session.add(new_notification)
    session.commit()
    session.refresh(new_notification)
    return new_notification

@router.post("/{notification_id}/read")
def mark_as_read(notification_id: int, session: Session = Depends(get_session)):
    notification = session.get(Notification, notification_id)
    if notification:
        notification.is_read = True
        session.add(notification)
        session.commit()
    return {"detail": "Notification marked as read"}
