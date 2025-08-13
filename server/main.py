import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import OperationalError, SQLAlchemyError

from schema import Character as SchemaCharacter
from schema import Show as SchemaShow
from schema import Genre as SchemaGenre
from schema import Trope as SchemaTrope 

from models import Character as ModelCharacter
from models import Show as ModelShow
from models import Genre as ModelGenre
from models import Trope as ModelTrope
from models import Base  # Import Base for table creation

import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import time
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv('.env')

# Your database URL is already properly formatted
database_url = os.environ.get('DATABASE_URL')

if not database_url:
    raise ValueError("DATABASE_URL environment variable is not set")

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

def test_database_connection():
    """Test database connection and create tables if needed"""
    try:
        # Test basic connectivity
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("✅ Database connection successful")
        
        # Try to create tables (this will be skipped if they already exist)
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables verified/created successfully")
        return True
        
    except OperationalError as e:
        print(f"❌ Database connection failed: {e}")
        if "does not exist" in str(e):
            print("💡 Hint: Make sure your database exists and is accessible")
            print("💡 You may need to restore your database from the dump file first")
        return False
    except Exception as e:
        print(f"❌ Error with database setup: {e}")
        return False

# Test connection on startup
if not test_database_connection():
    print("⚠️  Starting server anyway, but database operations will fail")

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI(title="Fanfiction Trope API", version="1.0.0")

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
    except SQLAlchemyError as e:
        logger.error(f"Database session error: {e}")
        db.rollback()
        raise HTTPException(status_code=503, detail="Database error occurred")
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
                "connection to server" in str(e) or
                "server closed the connection" in str(e)) and attempt < max_retries - 1:
                logger.warning(f"Database connection failed (attempt {attempt + 1}), retrying...")
                time.sleep(2 ** attempt)  # Exponential backoff
                continue
            raise
        except Exception as e:
            # For non-connection errors, don't retry
            raise

@app.get("/")
async def root():
    return {"message": "Fanfiction Trope API is running", "status": "healthy"}

# Add a health check endpoint to test database connectivity
@app.get("/health")
async def health_check(db: Session = Depends(get_db)):
    try:
        # Simple query to test database connection
        shows_count = db.query(ModelShow).count()
        characters_count = db.query(ModelCharacter).count()
        genres_count = db.query(ModelGenre).count()
        tropes_count = db.query(ModelTrope).count()
        
        return {
            "status": "healthy",
            "database": "connected",
            "counts": {
                "shows": shows_count,
                "characters": characters_count,
                "genres": genres_count,
                "tropes": tropes_count
            }
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }

@app.post('/characters/', response_model=SchemaCharacter)
async def create_character(character: SchemaCharacter, db: Session = Depends(get_db)):
    def _create_character():
        # Check if show exists
        show_exists = db.query(ModelShow).filter(ModelShow.id == character.show_id).first()
        if not show_exists:
            raise HTTPException(status_code=400, detail=f"Show with id {character.show_id} does not exist")
        
        db_character = ModelCharacter(name=character.name, show_id=character.show_id)
        db.add(db_character)
        db.commit()
        db.refresh(db_character)
        return db_character
    
    try:
        return retry_db_operation(_create_character)
    except HTTPException:
        raise
    except OperationalError as e:
        logger.error(f"Database error: {e}")
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
        logger.error(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

@app.post('/show/', response_model=SchemaShow)
async def create_show(show: SchemaShow, db: Session = Depends(get_db)):
    def _create_show():
        # Check if show already exists
        existing_show = db.query(ModelShow).filter_by(name=show.name).first()
        if existing_show:
            raise HTTPException(status_code=400, detail=f"Show '{show.name}' already exists")
        
        db_show = ModelShow(name=show.name)
        db.add(db_show)
        db.commit()
        db.refresh(db_show)
        return db_show
    
    try:
        return retry_db_operation(_create_show)
    except HTTPException:
        raise
    except OperationalError as e:
        logger.error(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

@app.get('/show/')
async def get_shows(db: Session = Depends(get_db)):
    def _get_shows():
        shows = db.query(ModelShow).all()
        return {"shows": [{"id": show.id, "name": show.name} for show in shows]}
    
    try:
        return retry_db_operation(_get_shows)
    except OperationalError as e:
        logger.error(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

@app.post('/genres/', response_model=SchemaGenre)
async def create_genre(genre: SchemaGenre, db: Session = Depends(get_db)):
    def _create_genre():
        # Check if genre already exists
        existing_genre = db.query(ModelGenre).filter_by(name=genre.name).first()
        if existing_genre:
            raise HTTPException(status_code=400, detail=f"Genre '{genre.name}' already exists")
        
        db_genre = ModelGenre(name=genre.name)
        db.add(db_genre)
        db.commit()
        db.refresh(db_genre)
        return db_genre
    
    try:
        return retry_db_operation(_create_genre)
    except HTTPException:
        raise
    except OperationalError as e:
        logger.error(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

@app.get('/genres/')
async def get_genres(db: Session = Depends(get_db)):
    def _get_genres():
        genres = db.query(ModelGenre).all()
        return {"genres": [{"id": genre.id, "name": genre.name} for genre in genres]}
    
    try:
        return retry_db_operation(_get_genres)
    except OperationalError as e:
        logger.error(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

@app.post('/tropes/', response_model=SchemaTrope)
async def create_trope(trope: SchemaTrope, db: Session = Depends(get_db)):
    def _create_trope():
        # Check if genre exists
        genre_exists = db.query(ModelGenre).filter(ModelGenre.id == trope.genre_id).first()
        if not genre_exists:
            raise HTTPException(status_code=400, detail=f"Genre with id {trope.genre_id} does not exist")
        
        # Check if trope already exists
        existing_trope = db.query(ModelTrope).filter_by(name=trope.name).first()
        if existing_trope:
            raise HTTPException(status_code=400, detail=f"Trope '{trope.name}' already exists")
        
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
    except HTTPException:
        raise
    except OperationalError as e:
        logger.error(f"Database error: {e}")
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
        logger.error(f"Database error: {e}")
        raise HTTPException(status_code=503, detail="Database temporarily unavailable")

# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)


