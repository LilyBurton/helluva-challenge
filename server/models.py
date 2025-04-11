from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Show(Base):
    __tablename__ = "shows"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    # Relationship: One show has many characters
    characters = relationship("Character", back_populates="show")


class Character(Base):
    __tablename__ = "characters"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    
    show_id = Column(Integer, ForeignKey("shows.id"), nullable=False)  # ✅ Foreign Key added
    show = relationship("Show", back_populates="characters")  # ✅ Relationship added

class Genre(Base):
    __tablename__ = "genres"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

