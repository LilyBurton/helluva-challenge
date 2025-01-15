import React, { useState, useEffect } from 'react';

const GenreGenerator = () => {
  const [generatedGenres, setGeneratedGenres] = useState(['', '', '']);
  const [selectDifficulty, setSelectDifficulty] = useState('');
  const [cycling, setCycling] = useState(false);

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 
    'Fantasy', 'Historical', 'Horror', 'Mystery', 
    'Romance', 'Sci-fi', 'Thriller', 'Western'
  ];

  const difficultyLevels = ['1 - Easy', '2 - Medium', '3 - Hard'];

  const pickRandomGenres = (count) => {
    const shuffled = [...genres].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (!cycling) return;

    const genreIntervals = [];
    const cyclingGenres = [...generatedGenres]; // Local copy to track cycling values
    const finalizationTimeouts = [];

    const startCycling = (index, delay) => {
      // Start cycling for a specific genre slot
      genreIntervals[index] = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * genres.length);
        cyclingGenres[index] = genres[randomIndex];
        setGeneratedGenres([...cyclingGenres]);
      }, 100);

      // Stop cycling for this slot after the delay
      finalizationTimeouts[index] = setTimeout(() => {
        clearInterval(genreIntervals[index]);
        const finalGenres = pickRandomGenres(index + 1); // Pick up to the current genre slot
        cyclingGenres[index] = finalGenres[index]; // Finalize the specific genre
        setGeneratedGenres([...cyclingGenres]);

        // If all genres have finalized, stop cycling entirely
        if (index === Math.min(selectDifficulty.split(' ')[0], 3) - 1) {
          setCycling(false);
        }
      }, delay);
    };

    // Determine cycling and finalization based on difficulty
    const count = selectDifficulty === '1 - Easy' ? 1 : selectDifficulty === '2 - Medium' ? 2 : 3;

    // Start cycling for each genre slot with staggered finalization
    const delays = [3000, 6000, 9000]; // Staggered delays for finalization
    for (let i = 0; i < count; i++) {
      startCycling(i, delays[i]);
    }

    return () => {
      // Cleanup intervals and timeouts
      genreIntervals.forEach((interval) => clearInterval(interval));
      finalizationTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [cycling, selectDifficulty]);

  const handleStartCycling = (e) => {
    setSelectDifficulty(e.target.value);
    setGeneratedGenres(['', '', '']); // Clear genres before starting a new cycle
    setCycling(true);
  };

  return (
    <div>
      <h2>Genre Generator</h2>
      <label>
        Pick a Difficulty:
        <select value={selectDifficulty} onChange={handleStartCycling}>
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
      <button onClick={() => setCycling(true)} disabled={!selectDifficulty || cycling}>
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




