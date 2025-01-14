import React, { useState, useEffect } from 'react';

const GenreGenerator = () => {
  const [generatedGenre, setGeneratedGenre] = useState('');
  const [cycling, setCycling] = useState(false);

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 
    'Fantasy', 'Historical', 'Horror', 'Mystery', 
    'Romance', 'Sci-fi', 'Thriller', 'Western'
  ];

  useEffect(() => {
    if (!cycling) return;

    // Ensure genres exist before proceeding
    if (!genres || genres.length === 0) return;

    let genreRandomIndex = Math.floor(Math.random() * genres.length);

    // Start cycling through genres
    const genreIntervalId = setInterval(() => {
      genreRandomIndex = Math.floor(Math.random() * genres.length); // Randomize each cycle
      setGeneratedGenre(genres[genreRandomIndex]);
    }, 100); // Update every 100ms

    // Stop cycling after 3 seconds
    const genreTimeoutId = setTimeout(() => {
      clearInterval(genreIntervalId);
      setCycling(false); // Stop cycling
    }, 3000);

    // Cleanup function
    return () => {
      clearInterval(genreIntervalId);
      clearTimeout(genreTimeoutId);
    };
  }, [cycling]); // Include cycling and genres in dependencies

  // Function to start cycling
  const handleStartCycling = () => {
    setCycling(true);
  };

  return (
    <div>
      <h2>Genre</h2>
      <button onClick={handleStartCycling} disabled={cycling}>
        Generate Genre
      </button>
      {generatedGenre && <p>Selected Genre: {generatedGenre}</p>}
    </div>
  );
};

export default GenreGenerator;
