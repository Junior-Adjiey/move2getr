# Auth routes here

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select
from models.account import Account
from db import get_session
from utils.token_utils import hash_password, verify_password, create_access_token, decode_access_token
from schemas.account import AccountCreate, AccountRead
from schemas.token import Token
from dependencies.auth_utils import get_current_user
from dependencies.auth_utils import require_admin
from fastapi.responses import Response




router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

@router.post("/register", response_model=AccountRead)
def register(account: AccountCreate, session: Session = Depends(get_session)):
    existing = session.exec(select(Account).where(Account.email == account.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already in use")

    user = Account(
        email=account.email,
        username=account.username,
        password=hash_password(account.password),
        name=account.name,
        surname=account.surname,
        nationality=account.nationality,
        age=account.age,
        gender=account.gender
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.exec(select(Account).where(Account.username == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": user.user_id})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=AccountRead)
def read_me(current_user: Account = Depends(get_current_user)):
    return current_user


@router.delete("/{user_id}")
def delete_user_by_admin(
    user_id: str,
    session: Session = Depends(get_session),
    current_user: Account = Depends(require_admin)  # <-- Only admins
):
    user = session.get(Account, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()
    return



@router.delete("/me", status_code=204)
def delete_my_account(
    session: Session = Depends(get_session),
    current_user: Account = Depends(get_current_user)
):
    print("🔍 DELETE /auth/me called")
    print(f"✅ User ID: {current_user.user_id}")
    print(f"✅ Username: {current_user.username}")
    print(f"✅ Is Admin: {current_user.is_admin}")

    try:
        session.delete(current_user)
        session.commit()
        print("✅ User deleted successfully.")
        return Response(status_code=204)
    except Exception as e:
        print(f"❌ Error during deletion: {e}")
        raise HTTPException(status_code=500, detail="Could not delete user")




