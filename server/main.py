# from fastapi import FastAPI, Depends, HTTPException
# from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
# from sqlalchemy.orm import sessionmaker, declarative_base, Session, relationship

# DATABASE_URL = "postgresql://lil:secretpassword@localhost/fanfiction"

# engine = create_engine(DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()

# app = FastAPI()

# # Define the Show model
# class Show(Base):
#     __tablename__ = "shows"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, unique=True, index=True)

#     # Relationship with characters
#     characters = relationship("Character", back_populates="show")

# # Define the Character model
# class Character(Base):
#     __tablename__ = "characters"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)
#     show_id = Column(Integer, ForeignKey("shows.id"))

#     # Relationship back to Show
#     show = relationship("Show", back_populates="characters")

# # Create tables in the database
# Base.metadata.create_all(bind=engine)

# # Dependency to get DB session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @app.get("/characters")
# def get_characters(show_name: str, db: Session = Depends(get_db)):
#     # Find the show by name
#     show = db.query(Show).filter(Show.name == show_name).first()
#     if not show:
#         raise HTTPException(status_code=404, detail="Show not found")
    
#     # Get characters associated with that show
#     characters = db.query(Character).filter(Character.show_id == show.id).all()
    
#     return {"show": show.name, "characters": [char.name for char in characters]}

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
