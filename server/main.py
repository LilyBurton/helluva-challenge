import uvicorn
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db

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

load_dotenv('.env')



print("DATABASE_URL:", os.environ['DATABASE_URL'])

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://helluva-challenge.vercel.app/"],  # React runs on port 3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(DBSessionMiddleware, db_url=os.environ['DATABASE_URL'])

@app.get("/")
async def root():
    return {"message": "hello world"}

@app.post('/characters/', response_model=SchemaCharacter)
async def character(character: SchemaCharacter):
    db_character = ModelCharacter(name=character.name, show_id = character.show_id)
    db.session.add(db_character)
    db.session.commit()
    return db_character

@app.get('/characters/')
async def get_characters(show: str = None):
    if show:
        show_record = db.session.query(ModelShow).filter_by(name=show).first()
        if not show_record:
            return {"characters": []}
        characters = db.session.query(ModelCharacter).filter_by(show_id=show_record.id).all()
    else:
        characters = db.session.query(ModelCharacter).all()

    return {"characters": [char.name for char in characters]}


@app.post('/show/', response_model=SchemaShow)
async def show(show:SchemaShow):
    db_show = ModelShow(name=show.name)
    db.session.add(db_show)
    db.session.commit()
    return db_show

@app.get('/show/')
async def show():
    show = db.session.query(ModelShow).all()
    return show

@app.post('/genres/', response_model=SchemaGenre)
async def genre(genre:SchemaGenre):
    db_genre = ModelGenre(name=genre.name)
    db.session.add(db_genre)
    db.session.commit()
    return db_genre

@app.get('/genres/')
async def genre():
    genre = db.session.query(ModelGenre).all()
    return genre

@app.post('/tropes/', response_model=SchemaTrope)
async def trope(trope:SchemaTrope):
    db_trope = ModelTrope(name=trope.name)
    db.session.add(db_trope)
    db.session.commit()
    return db_trope

@app.get('/tropes/')
async def get_tropes(genre: str = None):
    if genre:
        genre_record = db.session.query(ModelGenre).filter_by(name=genre).first()
        if not genre_record:
            return {"tropes": []}
        tropes = db.session.query(ModelTrope).filter_by(genre_id=genre_record.id).all()
    else:
        tropes = db.session.query(ModelTrope).all()

    return {"tropes": [[trope.name, trope.description] for trope in tropes]}

# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)


