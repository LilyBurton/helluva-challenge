import { useState, useEffect } from 'react';
import './App.css';

const CharacterGenerator = ({ onCharacterGenerated, selectedShow }) => {
  const [generatedFirstName, setGeneratedFirstName] = useState('');
  const [generatedSecondName, setGeneratedSecondName] = useState('');
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

  const getFirstNameList = () => {
    if (selectedShow === 'Hazbin Hotel') return hazbinHotelNames;
    if (selectedShow === 'Helluva Boss') return helluvaBossNames;
    if (selectedShow === 'Crossover') return [...hazbinHotelNames, ...helluvaBossNames];
    return [];
  };

  const getSecondNameList = (firstName) => {
    let names = [];
    if (selectedShow === 'Hazbin Hotel') names = [...hazbinHotelNames];
    if (selectedShow === 'Helluva Boss') names = [...helluvaBossNames];
    if (selectedShow === 'Crossover') names = [...hazbinHotelNames, ...helluvaBossNames];
    return names.filter(name => name !== firstName);
  };

  useEffect(() => {
    if (!isCycling || !selectedShow) return;

    const firstNames = getFirstNameList();
    let firstRandomIndex = Math.floor(Math.random() * firstNames.length);
    let finalFirstName = firstNames[firstRandomIndex];

    const secondNames = getSecondNameList(finalFirstName);
    let secondRandomIndex = Math.floor(Math.random() * secondNames.length);
    let finalSecondName = secondNames[secondRandomIndex];

    const firstInterval = setInterval(() => {
      firstRandomIndex = (firstRandomIndex + 1) % firstNames.length;
      setGeneratedFirstName(firstNames[firstRandomIndex]);
    }, 100);

    const secondInterval = setInterval(() => {
      secondRandomIndex = (secondRandomIndex + 1) % secondNames.length;
      setGeneratedSecondName(secondNames[secondRandomIndex]);
    }, 100);

    const stopFirstInterval = setTimeout(() => {
      clearInterval(firstInterval);
      setGeneratedFirstName(finalFirstName);
    }, 3000);

    const stopSecondInterval = setTimeout(() => {
      clearInterval(secondInterval);
      setGeneratedSecondName(finalSecondName);
      setIsCycling(false);
      onCharacterGenerated([{ name: finalFirstName }, { name: finalSecondName }]);
    }, 6000);

    return () => {
      clearInterval(firstInterval);
      clearInterval(secondInterval);
      clearTimeout(stopFirstInterval);
      clearTimeout(stopSecondInterval);
    };
  }, [isCycling, selectedShow]);

  const getCharacters = () => {
    if (selectedShow === "Hazbin Hotel") return "hazbin-characters";
    if (selectedShow === "Helluva Boss") return "helluva-characters";
    return "Helluva Fanfiction Challenge";
  }

  return (
    <div className="name-generator-container">
      <h2 className={getCharacters()}>Characters</h2>

      <div className="button-container">
        <button
          className="generate-button"
          onClick={() => setIsCycling(true)}
          disabled={!selectedShow || isCycling}
        >
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

