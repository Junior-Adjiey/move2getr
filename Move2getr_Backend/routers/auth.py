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
from fastapi import UploadFile, File
import shutil
import os
from schemas.account import AccountPatch
from schemas.account import LoginRequest



UPLOAD_DIR = "uploads/avatars"
os.makedirs(UPLOAD_DIR, exist_ok=True)

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

@router.post("/login")
def login(request: LoginRequest, session: Session = Depends(get_session)):
    user = session.exec(
        select(Account).where(Account.email == request.email)
    ).first()

    if not user or not verify_password(request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # FIX HERE
    access_token = create_access_token({"sub": user.user_id})
    return {"access_token": access_token}


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
    session.delete(current_user)
    session.commit()
    return Response(status_code=204)


@router.patch("/me")
def patch_my_profile(
    updates: AccountPatch,
    session: Session = Depends(get_session),
    current_user: Account = Depends(get_current_user)
):
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(current_user, field, value)

    session.add(current_user)
    session.commit()
    session.refresh(current_user)

    return current_user

@router.post("/upload-avatar")
async def upload_avatar(
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user: Account = Depends(get_current_user)
):
    # Save file
    file_path = os.path.join(UPLOAD_DIR, f"{current_user.user_id}_{file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Update user avatar path
    current_user.avatar = file_path
    session.add(current_user)
    session.commit()
    session.refresh(current_user)

    return {"avatar_url": file_path}


