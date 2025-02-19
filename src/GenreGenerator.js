import React, { useState, useEffect } from 'react';
import Tropes from './Tropes';
import CharacterGenerator from './CharacterGenerator';

const GenreGenerator = () => {
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [generatedGenres, setGeneratedGenres] = useState([]);
  const [finalizedGenres, setFinalizedGenres] = useState([]);
  const [showTropeGenerator, setShowTropeGenerator] = useState(false);
  const [finalizedTropes, setFinalizedTropes] = useState([]);
  const [genreDifficulty, setGenreDifficulty] = useState('');
  const [tropeDifficulty, setTropeDifficulty] = useState('');
  const [cyclingGenres, setCyclingGenres] = useState(false);
  const [cyclingTropes, setCyclingTropes] = useState(false);
  const [showSynopsis, setShowSynopsis] = useState(false)
  
  const allGenres = Object.keys(Tropes); // List of genres
  const difficultyLevels = ['1 - Easy', '2 - Medium', '3 - Hard'];


  const handleCharacterSelection = (firstName, secondName) => {
    const randomCharacter = Math.random() < 0.5 ? firstName : secondName;
    setSelectedCharacter(randomCharacter);

    const filteredGenres = allGenres.filter((genre) => genre !== 'Romance');
    if (
        firstName === 'Octavia' || secondName === 'Octavia' ||
        (firstName === 'Blitzo' && secondName === 'Loona') ||
        (firstName === 'Loona' && secondName === 'Blitzo') ||
        (firstName === 'Lucifer' && secondName === 'Charlie') ||
        (firstName === 'Charlie' && secondName === 'Lucifer') ||
        (firstName === 'Blitzo' && secondName === 'Barbie Wire') ||
        (firstName === 'Barbie Wire' && secondName === 'Blitzo') ||
        (firstName === 'Stella' && secondName === 'Andrealphus') ||
        (firstName === 'Andrealphus' && secondName === 'Stella') ||
        (firstName === 'Millie' && secondName === 'Sallie May') ||
        (firstName === 'Sallie May' && secondName === 'Millie') ||
        (firstName === 'Charlie' && secondName === 'Lilith') ||
        (firstName === 'Lilith' && secondName === 'Charlie') ||
        (firstName === 'Angel Dust' && secondName === 'Molly') ||
        (firstName === 'Molly' && secondName === 'Angel Dust') ||
        (firstName === 'Angel Dust' && secondName === 'Arakniss') ||
        (firstName === 'Arakniss' && secondName === 'Angel Dust') ||
        (firstName === 'Sera' && secondName === 'Emily') ||
        (firstName === 'Emily' && secondName === 'Sera') ||
        (firstName === 'Adam' && secondName === 'Abel') ||
        (firstName === 'Abel' && secondName === 'Adam') ||
        (firstName === 'Egg Boiz' || secondName === 'Egg Boiz') ||
        (firstName === 'Frank' || secondName === 'Frank')
    ) {
        setGeneratedGenres(filteredGenres);
    } else {
        setGeneratedGenres(allGenres);
    }
  };

    

  const pickRandomUnique = (pool, exclude) => {
    const available = pool.filter((item) => !exclude.includes(item));
    return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : '';
  };

  // 🎰 Genre Cycling Effect
  useEffect(() => {
    if (!cyclingGenres) return;

    const count = genreDifficulty === '1 - Easy' ? 1 : genreDifficulty === '2 - Medium' ? 2 : 3;
    const delays = [3000, 6000, 9000]; 
    let tempGenres = ['', '', ''];
    const genreIntervals = [];
    const finalizationTimeouts = [];

    const startCyclingGenres = (index, delay) => {
      genreIntervals[index] = setInterval(() => {
        tempGenres[index] = pickRandomUnique(generatedGenres, tempGenres);
        setFinalizedGenres([...tempGenres]);
      }, 100);

      finalizationTimeouts[index] = setTimeout(() => {
        clearInterval(genreIntervals[index]);
        tempGenres[index] = pickRandomUnique(generatedGenres, tempGenres);
        setFinalizedGenres([...tempGenres]);
        
        if (index === count - 1) {
          setCyclingGenres(false);
          setShowTropeGenerator(true);
        }
      }, delay);
    };

    for (let i = 0; i < count; i++) {
      startCyclingGenres(i, delays[i]);
    }

    return () => {
      genreIntervals.forEach(clearInterval);
      finalizationTimeouts.forEach(clearTimeout);
    };
  }, [cyclingGenres, genreDifficulty]);

  // 🎰 Trope Cycling Effect
  useEffect(() => {
    if (!cyclingTropes || finalizedGenres.length === 0) return;

    const count = tropeDifficulty === '1 - Easy' ? 1 : tropeDifficulty === '2 - Medium' ? 2 : 3;
    const delays = [3000, 6000, 9000]; 
    let tempTropes = ['', '', ''];
    const tropeIntervals = [];
    const finalizationTimeouts = [];

    const startCyclingTropes = (index, delay) => {
      tropeIntervals[index] = setInterval(() => {
        const combinedTropes = finalizedGenres.flatMap((genre) => Tropes[genre] || []);
        if (combinedTropes.length > 0) {
          tempTropes[index] = pickRandomUnique(combinedTropes, []);
          setFinalizedTropes([...tempTropes]);
        }
      }, 100);

      finalizationTimeouts[index] = setTimeout(() => {
        clearInterval(tropeIntervals[index]);
        const combinedTropes = finalizedGenres.flatMap((genre) => Tropes[genre] || []);
        tempTropes[index] = pickRandomUnique(combinedTropes, tempTropes);
        setFinalizedTropes([...tempTropes]);
        
        if (index === count - 1) {
          setCyclingTropes(false);
          setShowSynopsis(true)
        }
      }, delay);
    };

    for (let i = 0; i < count; i++) {
      startCyclingTropes(i, delays[i]);
    }

    return () => {
      tropeIntervals.forEach(clearInterval);
      finalizationTimeouts.forEach(clearTimeout);
    };
  }, [cyclingTropes, finalizedGenres]);

  const handleStartGenres = () => {
    if (!genreDifficulty) return;
    setFinalizedGenres(['', '', '']);
    setFinalizedTropes([]);
    setCyclingGenres(true);
    setCyclingTropes(false);
    setShowTropeGenerator(false);
  };

  const handleStartTropes = () => {
    if (!tropeDifficulty || finalizedGenres.length === 0) return;
    setFinalizedTropes(['', '', '']);
    setCyclingTropes(true);
  };

  return (
    <div>
        <CharacterGenerator onCharacterGenerated={handleCharacterSelection} />
    
      <h2>Genre Generator</h2>
        <label>
            Pick Genre Difficulty:
            <select value={genreDifficulty} onChange={(e) => setGenreDifficulty(e.target.value)}>
                <option value="" disabled>Select a difficulty</option>
                    {difficultyLevels.map((difficulty, index) => (
                <option key={index} value={difficulty}>{difficulty}</option>
          ))}
        </select>
      </label>
      <button onClick={handleStartGenres} disabled={!genreDifficulty || cyclingGenres}>
        Generate Genres
      </button>

      <div className="generated-genres">
        {finalizedGenres.length > 0 &&
          finalizedGenres.map((genre, index) => <p key={index}>{index + 1} Genre: {genre}</p>)}
      </div>

      {showTropeGenerator && (
        <>
          <h2>Trope Generator</h2>
          <label>
            Pick Trope Difficulty:
            <select value={tropeDifficulty} onChange={(e) => setTropeDifficulty(e.target.value)}>
              <option value="" disabled>Select a difficulty</option>
              {difficultyLevels.map((difficulty, index) => (
                <option key={index} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </label>
          <button onClick={handleStartTropes} disabled={!tropeDifficulty || cyclingTropes}>
            Generate Tropes
          </button>

          <div className="current-tropes">
            {finalizedTropes.length > 0 &&
              finalizedTropes.map((trope, index) => <p key={index}>{index + 1} Trope: {trope}</p>)}
          </div>
          {showSynopsis && (
            <div className="basic-synopsis">
                <h2>Basic Synopsis</h2>
                    <p>A story where {selectedCharacters[0]} and {selectedCharacters[1]} find themselves caught in{" "}
                        {finalizedTropes.length > 1
                        ? finalizedTropes[Math.floor(Math.random() * finalizedTropes.length)].name
                        : finalizedTropes[0].name}.</p>
            </div>
          )}
          
        </>
      )}
    </div>
  );
}

export default GenreGenerator;











