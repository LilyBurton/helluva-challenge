import React, { useState, useEffect } from 'react';
import Tropes from './Tropes';

const GenreGenerator = () => {
  const [generatedGenres, setGeneratedGenres] = useState(['', '', '']);
  const [finalizedGenres, setFinalizedGenres] = useState(['', '', '']);
  const [currentTropes, setCurrentTropes] = useState(['', '', '']);
  const [cyclingGenres, setCyclingGenres] = useState(false);
  const [cyclingTropes, setCyclingTropes] = useState(false);
  const [selectGenreDifficulty, setSelectGenreDifficulty] = useState('');
  const [selectTropeDifficulty, setSelectTropeDifficulty] = useState('')

  const genres = Object.keys(Tropes);
  const difficultyLevels = ['1 - Easy', '2 - Medium', '3 - Hard'];

  const pickRandomUniqueGenre = (pool, exclude) => {
    const available = pool.filter((item) => !exclude.includes(item));
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  };

  useEffect(() => {
    if (!cyclingGenres) return;

    const genreIntervals = [];
    const finalizationTimeouts = [];
    const cyclingGenresState = [...generatedGenres];

    const startCyclingGenres = (index, delay) => {
      genreIntervals[index] = setInterval(() => {
        const usedGenres = cyclingGenresState.filter((genre) => genre);
        const randomGenre = pickRandomUniqueGenre(genres, usedGenres);
        cyclingGenresState[index] = randomGenre;
        setGeneratedGenres([...cyclingGenresState]);
      }, 100);

      finalizationTimeouts[index] = setTimeout(() => {
        clearInterval(genreIntervals[index]);
        const usedGenres = cyclingGenresState.filter((genre) => genre);
        const finalGenre = pickRandomUniqueGenre(genres, usedGenres);
        cyclingGenresState[index] = finalGenre;
        setFinalizedGenres([...cyclingGenresState])
        setGeneratedGenres([...cyclingGenresState])

        setGeneratedGenres([...cyclingGenresState]);
        setFinalizedGenres([...cyclingGenresState]);

        if (index === delays.length - 1) setCyclingGenres(false);
      }, delay);
    };

    const count = selectGenreDifficulty === '1 - Easy' ? 1 : selectGenreDifficulty === '2 - Medium' ? 2 : 3;
    const delays = [3000, 6000, 9000];

    for (let i = 0; i < count; i++) {
      startCyclingGenres(i, delays[i]);
    }

    return () => {
      genreIntervals.forEach((interval) => clearInterval(interval));
      finalizationTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [cyclingGenres, selectGenreDifficulty]);

  useEffect(() => {
    if (!cyclingTropes) return;

    const tropeIntervals = [];
    const finalizationTimeouts = [];
    const cyclingTropesState = [...currentTropes];

    const startCyclingTropes = (index, delay) => {
        tropeIntervals[index] = setInterval(() => {
          const genre = finalizedGenres[index];
          if (genre) {
            const tropesForGenre = Tropes[genre];
            cyclingTropesState[index] = pickRandomUniqueGenre(tropesForGenre, []);
            setCurrentTropes([...cyclingTropesState]);
          }
        }, 200);

      finalizationTimeouts[index] = setTimeout(() => {
        clearInterval(tropeIntervals[index]);
        const genre = finalizedGenres[index];
        if (genre) {
          const tropesForGenre = Tropes[genre];
          const finalTrope = tropesForGenre[Math.floor(Math.random() * tropesForGenre.length)];
          cyclingTropesState[index] = finalTrope;
          setCurrentTropes([...cyclingTropesState]);
        }

        if (index === delays.length - 1) {
          setCyclingTropes(false);
        }
      }, delay);
    };

    const count = selectTropeDifficulty === '1 - Easy' ? 1 : selectTropeDifficulty === '2 - Medium' ? 2 : 3;
    const delays = [3000, 6000, 9000];

    for (let i = 0; i < count; i++) {
      startCyclingTropes(i, delays[i]);
    }

    return () => {
      tropeIntervals.forEach((interval) => clearInterval(interval));
      finalizationTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [cyclingTropes, selectTropeDifficulty, finalizedGenres]);

  const handleStartGenres = () => {
    if (!selectGenreDifficulty) return;
    setGeneratedGenres(['', '', '']);
    setFinalizedGenres(['', '', '']);
    setCurrentTropes(['', '', '']);
    setCyclingGenres(true);
  };
  const handleStartTropes = () => {
    if (!selectTropeDifficulty || finalizedGenres.every((genre) => !genre)) return;
    setCurrentTropes(['', '', ''])
    setCyclingTropes(true)
  }

  return (
    <div>
      <h2>Genre Generator</h2>
      <label>
        Pick a Difficulty:
        <select value={selectGenreDifficulty} onChange={(e) => setSelectGenreDifficulty(e.target.value)}>
          <option value="" disabled>
            Select a difficulty
          </option>
          {difficultyLevels.map((difficulty, index) => (
            <option key={index} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleStartGenres} disabled={!selectGenreDifficulty || cyclingGenres}>
        Generate Genres
      </button>
      <div className="generated-genres">
        {generatedGenres.map((genre, index) => (
          <p key={index}>
            {index + 1} Genre: {genre}
          </p>
        ))}
      </div>

      <h2>Trope Generator</h2>
      <label>
        Pick a Difficulty:
        <select value={selectTropeDifficulty} onChange={(e) => setSelectTropeDifficulty(e.target.value)}>
          <option value="" disabled>
            Select a difficulty
          </option>
          {difficultyLevels.map((difficulty, index) => (
            <option key={index} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleStartTropes} disabled={!selectTropeDifficulty || cyclingTropes}>
        Generate Tropes
      </button>
      <div className="generated-tropes">
        {currentTropes.map((trope, index) => (
          <p key={index}>
            {index + 1} Trope: {trope}
          </p>
        ))}
      </div>
    </div>
  );
};

export default GenreGenerator;






