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

  const getTitleClass = () => {
    if (selectedShow === "Hazbin Hotel") return "hazbin-text";
    if (selectedShow === "Helluva Boss") return "helluva-text";
    return "default-text"
  }

  const getShowTitle = () => {
    if (selectedShow === "Hazbin Hotel") return "Welcome to the Hazbin Hotel";
    if (selectedShow === "Helluva Boss") return "I.M.P";
    return "Helluva Fanfiction Challenge";
  }

  const handleSelect = (e) => {
    setSelectedShow(e.target.value);
    setGeneratedCharacters([]); // ✅ Reset characters when changing the show
  };

  const handleCharacterGenerated = (characters) => {
    setGeneratedCharacters(characters);
  };

  return (
    <div className={'app-container'}>
      <div className = {`${getBackgroundClass()}`}>

      {/* ✅ Fixed dropdown */}
      <div className = 'show-selection'>
      <h1 className={getTitleClass()}>{getShowTitle()}</h1>
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

      <GenreGenerator selectedCharacters={generatedCharacters} selectedShow={selectedShow}/>
      </div>
    </div>
  </div>
  );
}

export default App;


