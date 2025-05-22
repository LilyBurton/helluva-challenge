import { useState, useEffect } from 'react';
import './App.css';

const CharacterGenerator = ({ selectedShow, onCharacterGenerated }) => {
  const [hazbinCharacters, setHazbinCharacters] = useState([]);
  const [helluvaCharacters, setHelluvaCharacters] = useState([]);
  const [generatedFirstName, setGeneratedFirstName] = useState('');
  const [generatedSecondName, setGeneratedSecondName] = useState('');
  const [isCycling, setIsCycling] = useState(false);

  useEffect(() => {
    if (!selectedShow) return;

    const API_BASE = "process.env.NEXT_PUBLIC_API_BASE_URL;";

    if (selectedShow === "Crossover") {
      // Fetch both Hazbin and Helluva characters
      fetch(`${API_BASE}/characters?show=Hazbin Hotel`)
        .then((res) => res.json())
        .then((data) => setHazbinCharacters(data.characters || []));

      fetch(`${API_BASE}/characters?show=Helluva Boss`)
        .then((res) => res.json())
        .then((data) => setHelluvaCharacters(data.characters || []));
    } else {
      // Fetch only one set based on selected show
      fetch(`${API_BASE}/characters?show=${selectedShow}`)
        .then((res) => res.json())
        .then((data) => {
          if (selectedShow === "Hazbin Hotel") setHazbinCharacters(data.characters || []);
          else setHelluvaCharacters(data.characters || []);
        });
    }
  }, [selectedShow]);

  useEffect(() => {
    if (!isCycling) return;

    let firstPool, secondPool;

      if (selectedShow === "Hazbin Hotel") {
        firstPool = hazbinCharacters;
        secondPool = hazbinCharacters;
      } else if (selectedShow === "Helluva Boss") {
        firstPool = helluvaCharacters;
        secondPool = helluvaCharacters;
      } else if (selectedShow === "Crossover") {
        firstPool = hazbinCharacters;
        secondPool = helluvaCharacters;
      }

    if (firstPool.length === 0 || secondPool.length === 0) return;

    let firstIndex = Math.floor(Math.random() * firstPool.length);
    let secondIndex;

    do {
      secondIndex = Math.floor(Math.random() * secondPool.length);
    } while (secondPool[secondIndex] === firstPool[firstIndex]);

    const firstFinal = firstPool[firstIndex];
    const secondFinal = secondPool[secondIndex];

    const firstInterval = setInterval(() => {
      firstIndex = (firstIndex + 1) % firstPool.length;
      setGeneratedFirstName(firstPool[firstIndex]);
    }, 100);

    const secondInterval = setInterval(() => {
      secondIndex = (secondIndex + 1) % secondPool.length;
      setGeneratedSecondName(secondPool[secondIndex]);
    }, 100);

    const stopFirst = setTimeout(() => {
      clearInterval(firstInterval);
      setGeneratedFirstName(firstFinal);
    }, 3000);

    const stopSecond = setTimeout(() => {
      clearInterval(secondInterval);
      setGeneratedSecondName(secondFinal);
      setIsCycling(false);
      onCharacterGenerated?.([
        { name: firstFinal },
        { name: secondFinal }
      ]);
    }, 6000);

    return () => {
      clearInterval(firstInterval);
      clearInterval(secondInterval);
      clearTimeout(stopFirst);
      clearTimeout(stopSecond);
    };
  }, [isCycling, hazbinCharacters, helluvaCharacters, selectedShow]);

  const getCharactersClass = () => {
    if (selectedShow === "Hazbin Hotel") return "hazbin-characters";
    if (selectedShow === "Helluva Boss") return "helluva-characters";
    if (selectedShow === "Crossover") return "crossover-characters";
    return "default-text"; // For Crossover or home
  }

  return (
    <div className="name-generator-container">
      <h2 className={getCharactersClass()}>Characters</h2>

      <div className="button-container">
        <button
          className={`button generate-character-button ${selectedShow.toLowerCase().replace(' ', '-')}`}
          onClick={() => setIsCycling(true)}
          disabled={isCycling}
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


