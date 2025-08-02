import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import OperationalError

from schema import Character as SchemaCharacter
from schema import Show as SchemaShow
from schema import Genre as SchemaGenre
from schema import Trope as SchemaTrope 

from models import Character as ModelCharacter
from models import Show as ModelShow
from models import Genre as ModelGenre
from models import Trope as ModelTrope

import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import time

load_dotenv('.env')

# Your database URL is already properly formatted
database_url = os.environ['DATABASE_URL']

print("DATABASE_URL:", database_url)

# Create engine with better connection handling
engine = create_engine(
    database_url,
    pool_pre_ping=True,      # Test connections before use
    pool_recycle=3600,       # Recycle connections every hour
    pool_size=5,             # Number of connections to maintain
    max_overflow=10,         # Additional connections if needed
    connect_args={
        "connect_timeout": 10,
        "options": "-c statement_timeout=30000"
    }
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React runs on port 3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Retry decorator for database operations
def retry_db_operation(func, max_retries=3):
    """Retry database operations on connection failures"""
    for attempt in range(max_retries):
        try:
            return func()
        except OperationalError as e:
            if ("SSL connection has been closed" in str(e) or 
                "connection to server" in str(e)) and attempt < max_retries - 1:
                print(f"Database connection failed (attempt {attempt + 1}), retrying...")
                time.sleep(2 ** attempt)  # Exponential backoff
                continue
            raise
        except Exception as e:
            # For non-connection errors, don't retry
            raise

@app.get("/")
async def root():
    return {"message": "hello world"}

@app.post('/characters/', response_model=SchemaCharacter)
async def character(character: SchemaCharacter, db: Session = Depends(get_db)):
    def _create_character():
        db_character = ModelCharacter(name=character.name, show_id=character.show_id)
        db.add(db_character)
        db.commit()
        db.refresh(db_character)
        return db_character
    
    try:
        return retry_db_operation(_create_character)
    except OperationalError as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

@app.get('/characters/')
async def get_characters(show: str = None, db: Session = Depends(get_db)):
    def _get_characters():
        if show:
            show_record = db.query(ModelShow).filter_by(name=show).first()
            if not show_record:
                return {"characters": []}
            characters = db.query(ModelCharacter).filter_by(show_id=show_record.id).all()
        else:
            characters = db.query(ModelCharacter).all()

        return {"characters": [char.name for char in characters]}
    
    try:
        return retry_db_operation(_get_characters)
    except OperationalError as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

@app.post('/show/', response_model=SchemaShow)
async def show(show: SchemaShow, db: Session = Depends(get_db)):
    def _create_show():
        db_show = ModelShow(name=show.name)
        db.add(db_show)
        db.commit()
        db.refresh(db_show)
        return db_show
    
    try:
        return retry_db_operation(_create_show)
    except OperationalError as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

@app.get('/show/')
async def get_show(db: Session = Depends(get_db)):
    def _get_show():
        show = db.query(ModelShow).all()
        return show
    
    try:
        return retry_db_operation(_get_show)
    except OperationalError as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

@app.post('/genres/', response_model=SchemaGenre)
async def genre(genre: SchemaGenre, db: Session = Depends(get_db)):
    def _create_genre():
        db_genre = ModelGenre(name=genre.name)
        db.add(db_genre)
        db.commit()
        db.refresh(db_genre)
        return db_genre
    
    try:
        return retry_db_operation(_create_genre)
    except OperationalError as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

@app.get('/genres/')
async def genre(db: Session = Depends(get_db)):
    def _get_genres():
        genre = db.query(ModelGenre).all()
        return genre
    
    try:
        return retry_db_operation(_get_genres)
    except OperationalError as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

@app.post('/tropes/', response_model=SchemaTrope)
async def trope(trope: SchemaTrope, db: Session = Depends(get_db)):
    def _create_trope():
        db_trope = ModelTrope(
            name=trope.name, 
            genre_id=trope.genre_id, 
            description=trope.description
        )
        db.add(db_trope)
        db.commit()
        db.refresh(db_trope)
        return db_trope
    
    try:
        return retry_db_operation(_create_trope)
    except OperationalError as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

@app.get('/tropes/')
async def get_tropes(genre: str = None, db: Session = Depends(get_db)):
    def _get_tropes():
        if genre:
            genre_record = db.query(ModelGenre).filter_by(name=genre).first()
            if not genre_record:
                return {"tropes": []}
            tropes = db.query(ModelTrope).filter_by(genre_id=genre_record.id).all()
        else:
            tropes = db.query(ModelTrope).all()

        return {"tropes": [[trope.name, trope.description] for trope in tropes]}
    
    try:
        return retry_db_operation(_get_tropes)
    except OperationalError as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)


