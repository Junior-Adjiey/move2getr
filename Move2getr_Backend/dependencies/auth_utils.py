from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select
from models.account import Account
from db import get_session
from utils.token_utils import decode_access_token


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> Account:
    user_id = decode_access_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = session.exec(select(Account).where(Account.user_id == user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    print(f"✅ Current user authenticated: {user.username}")  # You already saw this in logs
    return user


def require_admin(current_user: Account = Depends(get_current_user)) -> Account:
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return current_user

