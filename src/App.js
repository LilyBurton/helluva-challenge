import { useState } from 'react';
import GenreGenerator from './GenreGenerator';
import CharacterGenerator from './CharacterGenerator';
import './App.css';

function App() {
  const [selectedShow, setSelectedShow] = useState('');
  const [generatedCharacters, setGeneratedCharacters] = useState([]);

  const vivShows = ['Hazbin Hotel', 'Helluva Boss', 'Crossover']; // ✅ Defined the array

  const getBackgroundClass = () => {
    if (selectedShow === "Hazbin Hotel") return "hazbin-background";
    if (selectedShow === "Helluva Boss") return "helluva-background";
    return "default-background";
  };

  const handleSelect = (e) => {
    setSelectedShow(e.target.value);
    setGeneratedCharacters([]); // ✅ Reset characters when changing the show
  };

  const handleCharacterGenerated = (characters) => {
    setGeneratedCharacters(characters);
    console.log("Generated Characters:", characters); // Debugging
  };

  return (
    <div className={'app-container'}>
      <div className = {`${getBackgroundClass()}`}>

      {/* ✅ Fixed dropdown */}
      <div className = 'show-selection'>
      <h1>Helluva Fanfiction Challenge</h1>
      <label>
        Pick a show:
        <select value={selectedShow} onChange={handleSelect}>
          <option value="" disabled>Select a show</option>
          {vivShows.map((show, index) => (
            <option key={index} value={show}>
              {show}
            </option>
          ))}
        </select>
      </label>

      <CharacterGenerator onCharacterGenerated={handleCharacterGenerated} selectedShow={selectedShow} />
      
      {/* ✅ Display generated character names */}
      {/* {generatedCharacters.length > 0 && (
        <div className="generated-characters">
          <h2>Generated Characters:</h2>
          <p>{generatedCharacters[0]?.name} & {generatedCharacters[1]?.name}</p>
        </div>
      )} */}

      <GenreGenerator />
      </div>
    </div>
  </div>
  );
}

export default App;


