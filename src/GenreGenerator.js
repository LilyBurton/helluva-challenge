import React, { useState, useEffect } from 'react';

const GenreGenerator = () => {
  const [generatedGenres, setGeneratedGenres] = useState(['', '', '']);
  const [selectDifficulty, setSelectDifficulty] = useState('');
  const [cycling, setCycling] = useState(false);

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 
    'Fantasy', 'Historical', 'Horror', 'Mystery', 
    'Romance and Smut', 'Sci-fi', 'Thriller', 'Western'
  ];

  const difficultyLevels = ['1 - Easy', '2 - Medium', '3 - Hard'];

  const pickRandomUniqueGenre = (usedGenres) => {
    const availableGenres = genres.filter((genre) => !usedGenres.includes(genre));
    const randomIndex = Math.floor(Math.random() * availableGenres.length);
    return availableGenres[randomIndex];
  };

  useEffect(() => {
    if (!cycling) return;

    const genreIntervals = [];
    const finalizationTimeouts = [];
    const cyclingGenres = [...generatedGenres]; // Local copy to track cycling values

    // Start cycling for each genre slot
    const startCycling = (index, delay) => {
      genreIntervals[index] = setInterval(() => {
        const usedGenres = cyclingGenres.filter((genre) => genre); // Exclude already finalized genres
        const randomGenre = pickRandomUniqueGenre(usedGenres);
        cyclingGenres[index] = randomGenre;
        setGeneratedGenres([...cyclingGenres]);
      }, 100);

      // Finalize the genre after the given delay
      finalizationTimeouts[index] = setTimeout(() => {
        clearInterval(genreIntervals[index]);
        const usedGenres = cyclingGenres.filter((genre) => genre); // Exclude finalized genres
        const finalGenre = pickRandomUniqueGenre(usedGenres);
        cyclingGenres[index] = finalGenre; // Set the final unique genre
        setGeneratedGenres([...cyclingGenres]);

        // Stop cycling if all genres are finalized
        if (index === delays.length - 1) {
          setCycling(false);
        }
      }, delay);
    };

    // Determine the number of genres to generate based on difficulty
    const count = selectDifficulty === '1 - Easy' ? 1 : selectDifficulty === '2 - Medium' ? 2 : 3;
    const delays = [3000, 6000, 9000]; // Staggered delays for finalization

    // Start cycling for each required genre slot
    for (let i = 0; i < count; i++) {
      startCycling(i, delays[i]);
    }

    return () => {
      // Cleanup intervals and timeouts
      genreIntervals.forEach((interval) => clearInterval(interval));
      finalizationTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [cycling, selectDifficulty]);

  const handleStartCycling = () => {
    if (!selectDifficulty) return; // Ensure difficulty is selected
    setGeneratedGenres(['', '', '']); // Clear genres before starting a new cycle
    setCycling(true);
  };

  const handleDifficultyChange = (e) => {
    setSelectDifficulty(e.target.value); // Set difficulty
    setCycling(false); // Stop any ongoing cycling
    setGeneratedGenres(['', '', '']); // Reset generated genres
  };

  return (
    <div>
      <h2>Genre Generator</h2>
      <label>
        Pick a Difficulty:
        <select value={selectDifficulty} onChange={handleDifficultyChange}>
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
      <button onClick={handleStartCycling} disabled={!selectDifficulty || cycling}>
        Generate Genre
      </button>
      <div className="generated-genres">
        {generatedGenres[0] && <p>First Genre: {generatedGenres[0]}</p>}
        {selectDifficulty !== '1 - Easy' && generatedGenres[1] && <p>Second Genre: {generatedGenres[1]}</p>}
        {selectDifficulty === '3 - Hard' && generatedGenres[2] && <p>Third Genre: {generatedGenres[2]}</p>}
      </div>
    </div>
  );
};

export default GenreGenerator;




