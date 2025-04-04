import React, { useState, useEffect } from 'react';
import Tropes from './Tropes';


const GenreGenerator = ({ selectedCharacters, selectedShow }) => {
  const [generatedGenres, setGeneratedGenres] = useState([]);
  const [finalizedGenres, setFinalizedGenres] = useState([]);
  const [showTropeGenerator, setShowTropeGenerator] = useState(false);
  const [finalizedTropes, setFinalizedTropes] = useState([]);
  const [genreDifficulty, setGenreDifficulty] = useState('');
  const [tropeDifficulty, setTropeDifficulty] = useState('');
  const [cyclingGenres, setCyclingGenres] = useState(false);
  const [cyclingTropes, setCyclingTropes] = useState(false);
  const [showSynopsis, setShowSynopsis] = useState(false);

  console.log("Tropes Object:", Tropes);

  const allGenres = Object.keys(Tropes);
  console.log("Extracted Genres (allGenres):", allGenres);
  const difficultyLevels = ['1 - Easy', '2 - Medium', '3 - Hard'];

  useEffect(() => {
    if (selectedCharacters.length < 2) return;

    const firstName = selectedCharacters[0]?.name;
    const secondName = selectedCharacters[1]?.name;
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
  }, [selectedCharacters]);
    
    const pickRandomUnique = (pool, exclude) => {
    const available = pool.filter((item) => !exclude.includes(item));
    return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : '';
  };

  useEffect(() => {

    if (!cyclingGenres) return;
    const count = genreDifficulty === '1 - Easy' ? 1 : genreDifficulty === '2 - Medium' ? 2 : 3;
    const delays = [3000, 6000, 9000];
    let tempGenres = new Array(count).fill('')
    const genreIntervals = [];
    const finalizationTimeouts = [];

    for (let i = 0; i < count; i++) {
      genreIntervals[i] = setInterval(() => {
        tempGenres[i] = pickRandomUnique(generatedGenres, tempGenres);
        console.log(`Cycling Genre ${i + 1}:`, tempGenres[i]);
        setFinalizedGenres([...tempGenres]);
      }, 100);

      finalizationTimeouts[i] = setTimeout(() => {
        clearInterval(genreIntervals[i]);
        tempGenres[i] = pickRandomUnique(generatedGenres, tempGenres);
        console.log(`Final Genre ${i + 1}:`, tempGenres[i]);
        setFinalizedGenres([...tempGenres]);

        if (i === count - 1) {
          console.log("Genre selection complete.");
          setCyclingGenres(false);
          setShowTropeGenerator(true);
        }
      }, delays[i]);
    }

    return () => {
      genreIntervals.forEach(clearInterval);
      finalizationTimeouts.forEach(clearTimeout);
    };
  }, [cyclingGenres, genreDifficulty]);

  useEffect(() => {
    if (!cyclingTropes || finalizedGenres.length === 0) return;

    const count = tropeDifficulty === '1 - Easy' ? 1 : tropeDifficulty === '2 - Medium' ? 2 : 3;
    const delays = [3000, 6000, 9000];
    let tempTropes = new Array(count).fill('')
    const tropeIntervals = [];
    const finalizationTimeouts = [];

    for (let i = 0; i < count; i++) {
      tropeIntervals[i] = setInterval(() => {
        const combinedTropes = finalizedGenres.flatMap((genre) => Tropes[genre] || []);
        if (combinedTropes.length > 0) {
          tempTropes[i] = pickRandomUnique(combinedTropes, []);
          console.log(`Cycling Trope ${i + 1}:`, tempTropes[i]);
          setFinalizedTropes([...tempTropes]);
        }
      }, 100);

      finalizationTimeouts[i] = setTimeout(() => {
        clearInterval(tropeIntervals[i]);
        const combinedTropes = finalizedGenres.flatMap((genre) => Tropes[genre] || []);
        tempTropes[i] = pickRandomUnique(combinedTropes, tempTropes);
        console.log(`Final Trope ${i + 1}:`, tempTropes[i]);
        setFinalizedTropes([...tempTropes]);

        if (i === count - 1) {
          console.log("Trope selection complete.");
          setCyclingTropes(false);
          setShowSynopsis(true);
        }
      }, delays[i]);
    }

    return () => {
      tropeIntervals.forEach(clearInterval);
      finalizationTimeouts.forEach(clearTimeout);
    };
  }, [cyclingTropes, finalizedGenres]);

  const generateSynopsis = () => {
    const char1 = selectedCharacters[0]?.name || 'Character 1';
    const char2 = selectedCharacters[1]?.name || 'Character 2';
    const [trope1, trope2, trope3] = finalizedTropes;

    if (finalizedTropes.length === 1) {
      return `${char1} and ${char2} find themselves caught in a classic case of ${trope1}.`;
    } else if (finalizedTropes.length === 2) {
      return `When ${char1} and ${char2} encounter ${trope1}, they soon realize they're also entangled in ${trope2}, making their journey even more complicated.`;
    } else if (finalizedTropes.length === 3) {
      return `After getting involved in ${trope1}, ${char1} and ${char2} soon face ${trope2}. But just when they think it can't get any worse, ${trope3} changes everything!`;
    } else {
      return `A mysterious story featuring ${char1} and ${char2} with unexpected twists.`;
    }
  };

  const getGenres = () => {
    if (selectedShow === 'Hazbin Hotel') return 'hazbin-genres';
    if (selectedShow === 'Helluva Boss') return 'helluva-genres';
    return 'default';
  }

  const getTropes = () => {
    if (selectedShow === 'Hazbin Hotel') return 'hazbin-tropes';
    if (selectedShow === 'Helluva Boss') return 'helluva-tropes';
    return 'default';
  }

  return (
    <div>
      <h2 className={getGenres()}>Genre Generator</h2>
      <label>
        Pick Genre Difficulty:
        <select value={genreDifficulty} onChange={(e) => setGenreDifficulty(e.target.value)}>
          <option value="" disabled>Select a difficulty</option>
          {difficultyLevels.map((difficulty, index) => (
            <option key={index} value={difficulty}>{difficulty}</option>
          ))}
        </select>
      </label>
      <button onClick={() => setCyclingGenres(true)} disabled={!genreDifficulty || cyclingGenres}>
        Generate Genres
      </button>

      <div className="generated-genres">
        {finalizedGenres.map((genre, index) => <p key={index}>{index + 1} Genre: {genre}</p>)}
      </div>

      {showTropeGenerator && (
        <>
          <h2 className={getTropes()}>Trope Generator</h2>
          <label>
            Pick Trope Difficulty:
            <select value={tropeDifficulty} onChange={(e) => setTropeDifficulty(e.target.value)}>
              <option value="" disabled>Select a difficulty</option>
              {difficultyLevels.map((difficulty, index) => (
                <option key={index} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </label>
          <button onClick={() => setCyclingTropes(true)} disabled={!tropeDifficulty || cyclingTropes}>
            Generate Tropes
          </button>

          <div className="current-tropes">
            {finalizedTropes.map((trope, index) => <p key={index}>{index + 1} Trope: {trope}</p>)}
          </div>

          {showSynopsis && (
            <div className="basic-synopsis">
              <h2>Basic Synopsis</h2>
              <p>{generateSynopsis()}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GenreGenerator;














