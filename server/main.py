from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, declerative_base, Session

DATABASE_URL = "postgresql://lil:secretpassword@localhost/fanfiction"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoFlush=False, bind=engine)
Base = declerative_base()

app = FastAPI()

class Character(Base):
    __tablename__= "characters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    show = Column(String, index=True)


Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/characters")
def get_characters(show: str = None, db: Session = Depends(get_db)):
    query = db.query(Character)
    if show:
        query = query.filter(Character.show == show)
    return query.all()