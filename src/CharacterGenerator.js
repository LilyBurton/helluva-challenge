import { useState, useEffect } from 'react';
import './App.css';

const CharacterGenerator = ({ selectedShow }) => {
  const [characters, setCharacters] = useState([])
  const [generatedFirstName, setGeneratedFirstName] = useState('');
  const [generatedSecondName, setGeneratedSecondName] = useState('');
  const [isCycling, setIsCycling] = useState(false);

  useEffect(() => {
    if (!selectedShow) return;

    fetch(`http://localhost:8000/characters?show=${selectedShow}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.characters); // Extract names
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedShow]);

  useEffect(() => {
    if (!isCycling || characters.length === 0) return;

    let firstRandomIndex = Math.floor(Math.random() * characters.length);
    let finalFirstName = characters[firstRandomIndex];

    let secondNames = characters.filter(name => name !== finalFirstName);
    let secondRandomIndex = Math.floor(Math.random() * secondNames.length);
    let finalSecondName = secondNames[secondRandomIndex];

    const firstInterval = setInterval(() => {
      firstRandomIndex = (firstRandomIndex + 1) % characters.length;
      setGeneratedFirstName(characters[firstRandomIndex]);
    }, 100);

    const secondInterval = setInterval(() => {
      secondRandomIndex = (secondRandomIndex + 1) % secondNames.length;
      setGeneratedSecondName(secondNames[secondRandomIndex]);
    }, 100);

    const stopFirstInterval = setTimeout(() => {
      clearInterval(firstInterval);
      setGeneratedFirstName(finalFirstName);
    }, 3000);

    const stopSecondInterval = setTimeout(() => {
      clearInterval(secondInterval);
      setGeneratedSecondName(finalSecondName);
      setIsCycling(false);
    }, 6000);

    return () => {
      clearInterval(firstInterval);
      clearInterval(secondInterval);
      clearTimeout(stopFirstInterval);
      clearTimeout(stopSecondInterval);
    };
  }, [isCycling, characters]);

  const getCharacters = () => {
    if (selectedShow === "Hazbin Hotel") return "hazbin-characters";
    if (selectedShow === "Helluva Boss") return "helluva-characters";
    return "Helluva Fanfiction Challenge";
  }

  return (
    <div className="name-generator-container">
      <h2 className={getCharacters()}>Characters</h2>

      <div className="button-container">
        <button
          className="generate-button"
          onClick={() => setIsCycling(true)}
          disabled={!selectedShow || isCycling}
        >
          Generate!
        </button>
        <p className="generated-name">
          {generatedFirstName && `First Character: ${generatedFirstName}`}
        </p>
        <p className="generated-name">
          {generatedSecondName && `Second Character: ${generatedSecondName}`}
        </p>
      </div>
    </div>
  );
};

export default CharacterGenerator;

