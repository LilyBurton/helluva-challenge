from pydantic import BaseModel

class Character(BaseModel):
    name: str
    show_id: int

    class Config:
        orm_mode = True

class Show(BaseModel):
    name: str

    class Config:
        orm_mode = True

class Genre(BaseModel):
    name: str

    class Config:
        orm_mode = True
