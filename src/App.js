import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GenreGenerator from './GenreGenerator';
import CharacterGenerator from './CharacterGenerator';
import './App.css';
import AuthForm from './AuthForm';
import APIQuotes from './APIQuotes';
import NavBar from './NavBar'


function App() {
  const [selectedShow, setSelectedShow] = useState('');
  const [generatedCharacters, setGeneratedCharacters] = useState([]);

  const vivShows = ['Hazbin Hotel', 'Helluva Boss', 'Crossover'];

  const getNavBar = () => {
    if (selectedShow === "Hazbin Hotel") return "hazbin-navbar";
    if (selectedShow === "Helluva Boss") return "helluva-navbar";
    if (selectedShow === "Crossover") return "crossover-navbar";
    return "default-navbar"
  }

  const getBackgroundClass = () => {
    if (selectedShow === "Hazbin Hotel") return "hazbin-background";
    if (selectedShow === "Helluva Boss") return "helluva-background";
    if (selectedShow === "Crossover") return "crossover-background";
    return "default-background";
  };

  const getTitleClass = () => {
    if (selectedShow === "Hazbin Hotel") return "hazbin-text";
    if (selectedShow === "Helluva Boss") return "helluva-text";
    if (selectedShow === "Crossover") return "crossover-text";
    return "default-text";
  };

  const getShowTitle = () => {
    if (selectedShow === "Hazbin Hotel") return "Welcome to the Hazbin Hotel";
    if (selectedShow === "Helluva Boss") return "I.M.P";
    if (selectedShow === "Crossover") return "Crossover";
    return "Helluva Fanfiction Challenge";
  };

  const handleSelect = (e) => {
    setSelectedShow(e.target.value);
    setGeneratedCharacters([]);
  };

  const handleCharacterGenerated = (characters) => {
    setGeneratedCharacters(characters);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <div className="login">
            <APIQuotes />
            <AuthForm />
          </div>
        } />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/" element={
          <div className="app-container">
            <div className={`page-wrapper ${getBackgroundClass()}`}>
              <div className='show-selection'>
                <div className={getNavBar()}>
                  <NavBar selectedShow={selectedShow}/>
                </div>
                <h1 className={getTitleClass()}>{getShowTitle()}</h1>
                {selectedShow !== 'Hazbin Hotel' && selectedShow !== 'Helluva Boss' && (
                <div className="button-selection">
                  {vivShows
                    .filter(show => show !== selectedShow)
                    .map((show, index) => (
                      <button
                        key={index}
                        value={show}
                        onClick={handleSelect}
                        className={`button show-button ${show.toLowerCase().replace(" ", "-")}-btn ${selectedShow && 'small-button'}`}
                      >
                        {show}
                      </button>
                    ))}
                </div>
                )}
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
        } />
      </Routes>
    </Router>
  );
}

export default App;


