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
    if (selectedShow === "Crossover") return "crossover-background"
    return "default-background";
  };

  const getTitleClass = () => {
    if (selectedShow === "Hazbin Hotel") return "hazbin-text";
    if (selectedShow === "Helluva Boss") return "helluva-text";
    if (selectedShow === "Crossover") return "crossover-text";
    return "default-text"
  }

  const getShowTitle = () => {
    if (selectedShow === "Hazbin Hotel") return "Welcome to the Hazbin Hotel";
    if (selectedShow === "Helluva Boss") return "I.M.P";
    if (selectedShow === "Crossover") return "Crossover"
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
      <div className = {`page-wrapper ${getBackgroundClass()}`}>

      {/* ✅ Fixed dropdown */}
      <div className = 'show-selection'>
      <h1 className={getTitleClass()}>{getShowTitle()}</h1>
        <div className="button-selection">
          {vivShows
          .filter(show => show !== selectedShow)
          .map((show, index) => (
            <button key={index} value={show} onClick={() => handleSelect({ target: { value: show } })}
            className={`button show-button ${show.toLowerCase().replace(" ", "-")}-btn ${selectedShow && 'small-button'}`}
>
              {show}
            </button>
          ))}
        </div>

      {(selectedShow === "Hazbin Hotel" || selectedShow === "Helluva Boss" || selectedShow === "Crossover") && (
  <>
    <CharacterGenerator 
      onCharacterGenerated={handleCharacterGenerated}
      selectedShow={selectedShow}
      setGeneratedCharacters={setGeneratedCharacters}
    />
    <GenreGenerator 
      selectedCharacters={generatedCharacters}
      selectedShow={selectedShow}
    />
  </>
)}

      </div>
    </div>
  </div>
  );
}

export default App;


