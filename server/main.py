import uvicorn
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db

from schema import Character as SchemaCharacter
from schema import Show as SchemaShow

from schema import Character
from schema import Show

from models import Character as ModelCharacter
from models import Show as ModelShow

import os
from dotenv import load_dotenv

load_dotenv('.env')

app = FastAPI()

app.add_middleware(DBSessionMiddleware, db_url=os.environ['DATABASE_URL'])

@app.get("/")
async def root():
    return {"message": "hello world"}

@app.post('/character/', response_model=SchemaCharacter)
async def character(character: SchemaCharacter):
    db_character = ModelCharacter(name=character.name, show_id = character.show_id)
    db.session.add(db_character)
    db.session.commit()
    return db_character

@app.get('/character/')
async def character():
    character = db.session.query(ModelCharacter).all()
    return character

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

# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)

