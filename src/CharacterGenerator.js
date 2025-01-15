import { useState, useEffect } from 'react';

const CharacterGenerator = () => {
    const [generatedFirstName, setGeneratedFirstName] = useState('');
    const [generatedSecondName, setGeneratedSecondName] = useState('');
    const [selectedShow, setSelectedShow] = useState('');
    const [isCycling, setIsCycling] = useState(false);

  const hazbinHotelNames = [
    'Charlie', 'Vaggie', 'Angel Dust', 'Nifty', 'Alastor', 'Husk',
    'Sir Pentious', 'Vox', 'Valentino', 'Velvette', 'Camilla', 'Zestial',
    'Lucifer', 'Rosie', 'Adam', 'Lute', 'Emily', 'Sera', 'Travis',
    "Vox's Assistant", 'Melissa', 'Baxter', 'Clara', 'Odette', 'Abel',
    'St. Peter', 'Molly', 'Arakniss', 'Frank', 'Egg Boiz', 'Missi Zilla', 'Lilith', 'Mimzy', 'Cherri Bomb'
  ];

  const helluvaBossNames = [
    'Blitzo', 'Millie', 'Moxxie', 'Loona', 'Stolas', 'Stella',
    'Octavia', 'Striker', 'Asmodeuous', 'Mammon', 'Queen Bee',
    'Fizzarolli', 'Satan', 'Andrealphus', 'Verosika', 'Sallie May',
    'Belphegor', 'Leviathan', 'Martha', 'Mrs Mayberry', 'Emberlynn',
    'Chazwick', 'Barbie Wire', 'Tex', 'Dennis'
  ];

  const vivShows = ['Hazbin Hotel', 'Helluva Boss', 'Crossover'];

  const getFirstNameList = () => {
    if (selectedShow === 'Hazbin Hotel' || selectedShow === 'Crossover') return hazbinHotelNames;
    if (selectedShow === 'Helluva Boss') return helluvaBossNames;
  };

  const getSecondNameList = () => {
    if (selectedShow === 'Helluva Boss' || selectedShow === 'Crossover') return helluvaBossNames;
    if (selectedShow === 'Hazbin Hotel') return hazbinHotelNames
  }

  const handleSelect = (e) => {
    setSelectedShow(e.target.value);
    setGeneratedFirstName('');
    setGeneratedSecondName('');
    setIsCycling(false); // Stop cycling when the show changes
  };

  // Cycle through names for 3 seconds
  useEffect(() => {
    if (!isCycling) return;

    const firstNames = getFirstNameList();
    if (firstNames.length === 0) return;

    let firstRandomIndex = Math.floor(Math.random() * firstNames.length);
    const firstIntervalId = setInterval(() => {
      setGeneratedFirstName(firstNames[firstRandomIndex]);
      firstRandomIndex = (firstRandomIndex + 1) % firstNames.length; // Cycle back to the start if at the end
    }, 100); 

    // Stop cycling after 3 seconds
    const firstTimeoutId = setTimeout(() => {
      clearInterval(firstIntervalId);
    }, 3000); // Stop after 3 seconds

    const secondNames = getSecondNameList();
    if (secondNames.length === 0) return;

    let secondRandomIndex = Math.floor(Math.random() * firstNames.length);
    const secondIntervalId = setInterval(() => {
      setGeneratedSecondName(secondNames[secondRandomIndex]);
      secondRandomIndex = (secondRandomIndex + 1) % secondNames.length; // Cycle back to the start if at the end
    }, 100); 

    const secondTimeoutId = setTimeout(() => {
      clearInterval(secondIntervalId);
      setIsCycling(false);
    }, 6000);

    return () => {
      clearInterval(firstIntervalId);
      clearInterval(secondIntervalId)
      clearTimeout(firstTimeoutId);
      clearTimeout(secondTimeoutId);
    };
  }, [isCycling, selectedShow]);

  

  return (
    <div className="name-generator-container">
      <h2>Characters</h2>
      <label>
        Pick a show:
        <select value={selectedShow} onChange={handleSelect}>
          <option value="" disabled>
            Select a show
          </option>
          {vivShows.map((show, index) => (
            <option key={index} value={show}>
              {show}
            </option>
          ))}
        </select>
      </label>
      <div className="button-container">
        <button className="generate-button" onClick={() => setIsCycling(true)}>
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
}

export default CharacterGenerator;