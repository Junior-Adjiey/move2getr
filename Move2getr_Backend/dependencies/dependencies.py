from fastapi import Depends, HTTPException, status
from models.account import Account
from dependencies.auth_utils import get_current_user

def require_admin(current_user: Account = Depends(get_current_user)) -> Account:
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admins only! 🚫"
        )
    return current_user


