from pydantic import BaseModel

class Character(BaseModel):
    name: str
    show_id: int

    class Config:
        from_attributes = True

class Show(BaseModel):
    name: str

    class Config:
        from_attributes = True

class Genre(BaseModel):
    name: str

    class Config:
       from_attributes = True

class Trope(BaseModel):
    name: str
    genre_id: int
    description: str

    class Config:
        from_attributes = True
