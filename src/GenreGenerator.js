import React, { useState, useEffect, useRef } from 'react';


// Blocking logic extracted to top-level scope
const blockedNames = ['Octavia', 'Frank', 'Egg Bois', 'Kitty'];
const blockedPairs = new Set([
  ['Blitzo', 'Loona'],
  ['Lucifer', 'Charlie'],
  ['Blitzo', 'Barbie Wire'],
  ['Stella', 'Andrealphus'],
  ['Millie', 'Sallie May'],
  ['Charlie', 'Lilith'],
  ['Angel Dust', 'Molly'],
  ['Angel Dust', 'Arakniss'],
  ['Sera', 'Emily'],
  ['Adam', 'Abel'],
].map(pair => pair.sort().join('|')));

function shouldBlockGenre(firstName, secondName, genre) {
  const isBlockedGenre = genre === 'Romance' || genre === 'Smut/Erotica';
  if (!isBlockedGenre) return false;

  if (blockedNames.includes(firstName) || blockedNames.includes(secondName)) {
    console.log(`🛑 Blocked by name: ${firstName} or ${secondName} for genre "${genre}"`);
    return true;
  }

  
  const pair = [firstName, secondName].sort().join('|');
  if (blockedPairs.has(pair)) {
    console.log(`🛑 Blocked by pair: ${firstName} and ${secondName} for genre "${genre}"`);
    return true;
  }

  // return blockedPairs.has(pair);

  console.log(`✅ Genre "${genre}" allowed for ${firstName} and ${secondName}`);
  return false;
}


const GenreGenerator = ({ selectedCharacters, selectedShow }) => {
  const [allGenres, setAllGenres] = useState([]);
  const [genreTropes, setGenreTropes] = useState({})
  const [generatedGenres, setGeneratedGenres] = useState([]);
  const [finalizedGenres, setFinalizedGenres] = useState([]);
  const [showTropeGenerator, setShowTropeGenerator] = useState(false);
  const [finalizedTropes, setFinalizedTropes] = useState([]);
  const [genreDifficulty, setGenreDifficulty] = useState('');
  const [tropeDifficulty, setTropeDifficulty] = useState('');
  const [cyclingGenres, setCyclingGenres] = useState(false);
  const [cyclingTropes, setCyclingTropes] = useState(false);

  const genreSectionRef = useRef(null);
  const tropeSectionRef = useRef(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://helluva-challenge.onrender.com/genres/');
        const data = await response.json();
        const genreNames = data.map(g => g.name);
        setAllGenres(genreNames);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
  if (selectedCharacters.length < 2 && genreSectionRef.current) {
    genreSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  if (selectedCharacters.length < 2) return;
  const firstName = selectedCharacters[0]?.name;
  const secondName = selectedCharacters[1]?.name;
  const filtered = allGenres.filter(
    genre => !shouldBlockGenre(firstName, secondName, genre)
  );
  setGeneratedGenres(filtered);
}, [selectedCharacters, allGenres]);

  const pickRandomUnique = (pool, exclude) => {
    const available = pool.filter(item => !exclude.includes(item));
    return available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : '';
  };

  useEffect(() => {
    if (!cyclingGenres) return;

    const count = genreDifficulty === 'Easy' ? 1 : genreDifficulty === 'Medium' ? 2 : 3;
    const delays = [3000, 6000, 9000];
    let tempGenres = new Array(count).fill('');
    const genreIntervals = [];
    const finalizationTimeouts = [];

    const firstName = selectedCharacters[0]?.name;
    const secondName = selectedCharacters[1]?.name;
    

    for (let i = 0; i < count; i++) {
      genreIntervals[i] = setInterval(() => {
        let picked;
        do {
          picked = pickRandomUnique(allGenres, tempGenres);
        } while (shouldBlockGenre(firstName, secondName, picked));

        tempGenres[i] = picked;
        setFinalizedGenres([...tempGenres]);
      }, 100);

      finalizationTimeouts[i] = setTimeout(() => {
        clearInterval(genreIntervals[i]);
        let picked;
        do {
          picked = pickRandomUnique(allGenres, tempGenres);
        } while (shouldBlockGenre(firstName, secondName, picked));

        tempGenres[i] = picked;
        
        setFinalizedGenres([...tempGenres]);

        if (i === count - 1) {
          setCyclingGenres(false);
          setShowTropeGenerator(true);
          console.log('✅ Genre selection complete:', tempGenres);
        }
      }, delays[i]);
    }

    return () => {
      genreIntervals.forEach(clearInterval);
      finalizationTimeouts.forEach(clearTimeout);
    };
  }, [cyclingGenres, genreDifficulty, allGenres, selectedCharacters]);

  useEffect(() => {
    if (!cyclingTropes || finalizedGenres.length === 0) return;
  
    const fetchAndCycleTropes = async () => {
      const allFetchedTropes = {};
  
      // Step 1: Fetch all tropes for finalized genres
      for (const genre of finalizedGenres) {
        try {
          const response = await fetch(`https://helluva-challenge.onrender.com/tropes/?genre=${genre}`);
          const data = await response.json();
          allFetchedTropes[genre] = data.tropes;
        } catch (error) {
          console.error(`Error fetching tropes for genre "${genre}":`, error);
          allFetchedTropes[genre] = [];
        }
      }
  
      setGenreTropes(allFetchedTropes);
  
      // Step 2: Start cycling using fetched tropes
      const count = tropeDifficulty === 'Easy' ? 1 : tropeDifficulty === 'Medium' ? 2 : 3;
      const delays = [3000, 6000, 9000];
      let tempTropes = new Array(count).fill('');
      const tropeIntervals = [];
      const finalizationTimeouts = [];
  
      for (let i = 0; i < count; i++) {
        tropeIntervals[i] = setInterval(() => {
          const combinedTropes = finalizedGenres.flatMap(genre => allFetchedTropes[genre] || []);
          if (combinedTropes.length > 0) {
            tempTropes[i] = pickRandomUnique(combinedTropes, []);
            setFinalizedTropes([...tempTropes]);
          }
        }, 100);
  
        finalizationTimeouts[i] = setTimeout(() => {
          clearInterval(tropeIntervals[i]);
          const combinedTropes = finalizedGenres.flatMap(genre => allFetchedTropes[genre] || []);
          tempTropes[i] = pickRandomUnique(combinedTropes, tempTropes);
          setFinalizedTropes([...tempTropes]);
  
          if (i === count - 1) {
            setCyclingTropes(false);
          }
        }, delays[i]);
      }
  
      return () => {
        tropeIntervals.forEach(clearInterval);
        finalizationTimeouts.forEach(clearTimeout);
      };
    };
  
    fetchAndCycleTropes();
  }, [cyclingTropes, finalizedGenres, tropeDifficulty]);

   useEffect(() => {
    if (showTropeGenerator && tropeSectionRef.current) {
      tropeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showTropeGenerator]);
  

  const getGenres = () => {
    if (selectedShow === 'Hazbin Hotel') return 'hazbin-genres';
    if (selectedShow === 'Helluva Boss') return 'helluva-genres';
    if (selectedShow === 'Crossover') return 'crossover-genres';
    return 'default';
  };

  const getTropes = () => {
    if (selectedShow === 'Hazbin Hotel') return 'hazbin-tropes';
    if (selectedShow === 'Helluva Boss') return 'helluva-tropes';
    if (selectedShow === 'Crossover') return 'crossover-tropes';
    return 'default';
  };
  console.log("Finalized Tropes:", finalizedTropes)

  useEffect (() => {
    setFinalizedGenres([]);
    setFinalizedTropes([]);
    setCyclingGenres(false);
    setCyclingTropes(false);
    setGenreDifficulty('');
    setTropeDifficulty('');
  }, [selectedShow]);

  return (
    <div>
      <h2 className={getGenres()} ref={genreSectionRef}>Genre Generator</h2>
        <div className='difficulty-buttons'>
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <button
              key={level}
              className={`button difficulty-button ${level.toLowerCase()} ${genreDifficulty === level ? 'active' : ''} ${selectedShow.toLowerCase().replace(' ', '-')}`}
              onClick={() => setGenreDifficulty(level)}
            >
              {level}

              {console.log(`Button class: button difficulty-button ${level.toLowerCase()} ${genreDifficulty === level ? 'active' : ''} ${selectedShow.toLowerCase().replace(' ', '-')}`)}
            </button>

          ))}
        </div>
      <button onClick={() => setCyclingGenres(true)} disabled={!genreDifficulty || cyclingGenres} className={`button generate-genre-button ${selectedShow.toLowerCase().replace(' ', '-')}`}>
        Generate Genres
      </button>

      <div className="generated-genres">
        {finalizedGenres.map((genre, index) => (
          <p key={index}>{genre}</p>
        ))}
      </div>

      {showTropeGenerator && (
        <>
          <h2 className={getTropes()} ref={tropeSectionRef}>Trope Generator</h2>
          <div className='tropes-buttons'>
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <button
              key={level}
              className={`button trope-button ${level.toLowerCase()} ${tropeDifficulty === level ? 'active' : ''} ${selectedShow.toLowerCase().replace(' ', '-')}`}
              onClick={() => setTropeDifficulty(level)}
            >
              {level}
            </button>
          ))}
        </div>
          <button onClick={() => setCyclingTropes(true)} disabled={!tropeDifficulty || cyclingTropes} className={`button generate-trope-button ${selectedShow.toLowerCase().replace(' ', '-')}`}>
            Generate Tropes
          </button>

          <div className="current-tropes">
            {finalizedTropes.map((trope, index) => (
              <div key={index} className="trope-entry">
                <p><strong>{trope[0]}</strong></p>
                {!cyclingTropes && trope[1] && (
                  <p className="trope-desc">{trope[1]}</p>
                )}
          </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


export default GenreGenerator;















