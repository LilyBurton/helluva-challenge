import { useState, useEffect } from 'react';

const CharacterGenerator = ({ onCharacterGenerated }) => {
  const [generatedFirstName, setGeneratedFirstName] = useState('');
  const [generatedSecondName, setGeneratedSecondName] = useState('');
  const [selectedShow, setSelectedShow] = useState('');
  const [isCycling, setIsCycling] = useState(false);

  const hazbinHotelNames = [
    'Charlie', 'Vaggie', 'Angel Dust', 'Nifty', 'Alastor', 'Husk',
    'Sir Pentious', 'Vox', 'Valentino', 'Velvette', 'Camilla', 'Zestial',
    'Lucifer', 'Rosie', 'Adam', 'Lute', 'Emily', 'Sera', 'Travis',
    "Vox's Assistant", 'Melissa', 'Baxter', 'Clara', 'Odette', 'Abel',
    'St. Peter', 'Molly', 'Arakniss', 'Frank', 'Egg Boiz', 'Missi Zilla', 'Lilith', 'Mimzy', 'Cherri Bomb', 'Katie Killjoy', 'Tom Trench'
  ];

  const helluvaBossNames = [
    'Blitzo', 'Millie', 'Moxxie', 'Loona', 'Stolas', 'Stella',
    'Octavia', 'Striker', 'Asmodeuous', 'Mammon', 'Queen Bee',
    'Fizzarolli', 'Satan', 'Andrealphus', 'Verosika', 'Sallie May',
    'Belphegor', 'Leviathan', 'Martha', 'Mrs Mayberry', 'Emberlynn',
    'Chazwick', 'Barbie Wire', 'Tex', 'Dennis', 'Vassago'
  ];

  const vivShows = ['Hazbin Hotel', 'Helluva Boss', 'Crossover'];

  const getFirstNameList = () => {
    if (selectedShow === 'Hazbin Hotel' || selectedShow === 'Crossover') return hazbinHotelNames;
    if (selectedShow === 'Helluva Boss') return helluvaBossNames;
    return [];
  };

  const getSecondNameList = () => {
    if (selectedShow === 'Helluva Boss' || selectedShow === 'Crossover') return helluvaBossNames;
    if (selectedShow === 'Hazbin Hotel') return hazbinHotelNames;
    return [];
  };

  const handleSelect = (e) => {
    setSelectedShow(e.target.value);
    setGeneratedFirstName('');
    setGeneratedSecondName('');
    setIsCycling(false);
  };

  useEffect(() => {
    if (!isCycling) return;

    const firstNames = getFirstNameList();
    const secondNames = getSecondNameList();

    if (firstNames.length === 0 || secondNames.length === 0) return;

    let firstRandomIndex = Math.floor(Math.random() * firstNames.length);
    let secondRandomIndex = Math.floor(Math.random() * secondNames.length);
    let finalFirstName = ''
    let finalSecondName = ''

    // Cycling first name
    const firstIntervalId = setInterval(() => {
        firstRandomIndex = (firstRandomIndex + 1) % firstNames.length;
        setGeneratedFirstName(firstNames[firstRandomIndex]);
    }, 100);

    // Cycling second name
    const secondIntervalId = setInterval(() => {
        secondRandomIndex = (secondRandomIndex + 1) % secondNames.length;
        setGeneratedSecondName(secondNames[secondRandomIndex]);
    }, 100);

    // After 3 seconds, stop the first name interval
    const firstTimeoutId = setTimeout(() => {
      clearInterval(firstIntervalId);
      finalFirstName = firstNames[firstRandomIndex]
    }, 3000);

    // After 6 seconds, stop the second name interval and stop cycling
    const secondTimeoutId = setTimeout(() => {
      clearInterval(secondIntervalId);
      finalSecondName = secondNames[secondRandomIndex]

      setGeneratedFirstName(finalFirstName)
      setGeneratedSecondName(finalSecondName)
      setIsCycling(false);

      onCharacterGenerated(firstNames[firstRandomIndex], secondNames[secondRandomIndex]);
    }, 6000);

    

    // Cleanup intervals and timeouts
    return () => {
      clearInterval(firstIntervalId);
      clearInterval(secondIntervalId);
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
};

export default CharacterGenerator;