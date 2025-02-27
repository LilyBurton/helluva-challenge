import { useState, useEffect } from 'react';
import './App.css'

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
    'St. Peter', 'Molly', 'Arakniss', 'Frank', 'Egg Boiz', 'Missi Zilla', 
    'Lilith', 'Mimzy', 'Cherri Bomb', 'Katie Killjoy', 'Tom Trench'
  ];

  const helluvaBossNames = [
    'Blitzo', 'Millie', 'Moxxie', 'Loona', 'Stolas', 'Stella',
    'Octavia', 'Striker', 'Asmodeous', 'Mammon', 'Queen Bee',
    'Fizzarolli', 'Satan', 'Andrealphus', 'Verosika', 'Sallie May',
    'Belphegor', 'Leviathan', 'Martha', 'Mrs Mayberry', 'Emberlynn',
    'Chazwick', 'Barbie Wire', 'Tex', 'Dennis', 'Vassago'
  ];

  const vivShows = ['Hazbin Hotel', 'Helluva Boss', 'Crossover'];

  // Get first name list based on the selected show
  const getFirstNameList = () => {
    if (selectedShow === 'Hazbin Hotel' || selectedShow === 'Crossover') return hazbinHotelNames;
    if (selectedShow === 'Helluva Boss') return helluvaBossNames;
    return [];
  };

  // Get second name list and filter out first name
  const getSecondNameList = (firstName) => {
    let names = [];

    if (selectedShow === 'Helluva Boss' || selectedShow === 'Crossover') {
      names = [...helluvaBossNames];
    }
    if (selectedShow === 'Hazbin Hotel') {
      names = [...hazbinHotelNames];
    }

    const filteredNames = names.filter(name => name !== firstName);
    console.log(`Filtered Second Names (without ${firstName}):`, filteredNames); // Debugging

    return filteredNames;
  };

  // Change backgrounds based on the show
  const getBackgroundClass = () => {
    if (selectedShow === "Hazbin Hotel") return "hazbin-background";
    if (selectedShow === "Helluva Boss") return "helluva-background";
    return "";
  };

  // Handle show selection
  const handleSelect = (e) => {
    setSelectedShow(e.target.value);
    setGeneratedFirstName('');
    setGeneratedSecondName('');
    setIsCycling(false);
  };

  // Generate names with a cycling effect
  useEffect(() => {
    if (!isCycling) return;

    const firstNames = getFirstNameList();
    let firstRandomIndex = Math.floor(Math.random() * firstNames.length);
    let finalFirstName = firstNames[firstRandomIndex];

    const secondNames = getSecondNameList(finalFirstName);
    let secondRandomIndex = Math.floor(Math.random() * secondNames.length);
    let finalSecondName = secondNames[secondRandomIndex];

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

    // Stop cycling first name after 3 seconds
    const firstTimeoutId = setTimeout(() => {
      clearInterval(firstIntervalId);
      setGeneratedFirstName(finalFirstName);
    }, 3000);

    // Stop cycling second name after 6 seconds
    const secondTimeoutId = setTimeout(() => {
      clearInterval(secondIntervalId);
      setGeneratedSecondName(finalSecondName);
      setIsCycling(false);

      // Send selected names back to parent component
      onCharacterGenerated([
        { name: finalFirstName },
        { name: finalSecondName }
      ]);
    }, 6000);

    return () => {
      clearInterval(firstIntervalId);
      clearInterval(secondIntervalId);
      clearTimeout(firstTimeoutId);
      clearTimeout(secondTimeoutId);
    };
  }, [isCycling, selectedShow]);

  return (
    <div className={getBackgroundClass()}>
    <div className="name-generator-container">
      <h2>Characters</h2>
      <label>
        Pick a show:
        <select value={selectedShow} onChange={handleSelect}>
          <option value="" disabled>Select a show</option>
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
    </div>
  );
};

export default CharacterGenerator;
