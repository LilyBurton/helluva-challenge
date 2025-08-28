import { render, screen } from '@testing-library/react';
import CharacterGenerator from './CharacterGenerator';

beforeEach(() => {
    global.fetch = jest.fn((url) => {
        if (url.includes('Hazbin Hotel')) {
            return Promise.resolve({
                json: () => Promise.resolve({ characters: [{ name: 'Charlie' }, { name: 'Vaggie' }, { name: 'Alastor' }, {name: 'Angel Dust'}, {name: 'Husk'}, {name: 'Nifty'}] }),
            });
        }
        if (url.includes('Helluva Boss')) {
            return Promise.resolve({
                json: () => Promise.resolve({ characters: [{ name: 'Blitzo' }, { name: 'Moxxie' }, { name: 'Millie' }, {name: 'Loona'}, {name: 'Stolas'}] }),
            });
        }
        return Promise.resolve({ json: () => Promise.resolve({ characters: [] })
     });
  });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('CharacterGenerator', () => {
  test('renders CharacterGenerator component', () => {
    render(
    <CharacterGenerator
    selectedShow="Hazbin Hotel" 
    setGeneratedCharacters={jest.fn()}
    onCharacterGenerated={jest.fn()}/>
);
    const heading = screen.getByRole('heading', { name: /characters/i });
    expect(heading).toBeInTheDocument();
  });
});






