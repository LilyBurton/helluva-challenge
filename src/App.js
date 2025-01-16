import React from 'react';
import CharacterGenerator from './CharacterGenerator';
import GenreGenerator from './GenreGenerator';
import Tropes from './Tropes';

function App() {
  return (
    <div>
      <h1>Helluva Fanfiction Challenge</h1>
      <CharacterGenerator />
      <GenreGenerator />
    </div>
  )
  
}

export default App;

