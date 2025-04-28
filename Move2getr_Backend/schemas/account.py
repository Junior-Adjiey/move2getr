from pydantic import BaseModel, EmailStr, validator

from typing import Optional
from pydantic import BaseModel

class AccountPatch(BaseModel):
    email: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    name: Optional[str] = None
    surname: Optional[str] = None
    nationality: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None

class AccountCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    confirm_password: str
    name: str
    surname: str
    nationality: str
    age: int
    gender: str

    @validator("confirm_password")
    def match_passwords(cls, v, values):
        if v != values.get("password"):
            raise ValueError("Passwords do not match")
        return v

class AccountRead(BaseModel):
    user_id: str
    email: EmailStr
    username: str
    name: str
    surname: str
    nationality: str
    age: int
    gender: str
    
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


