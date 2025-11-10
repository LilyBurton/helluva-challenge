
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class UserSignUp(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50, pattern="^[a-zA-Z0-9_-]+$")
+   password: str = Field(..., min_length=8, max_length=128)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None