import { useState, useRef, useEffect } from 'react'


const sampleQuotes = [
    {
        id: 1,
        quote: "Ladies and gentlemen, I'm opening the first of its kind, a hotel that rehabilitates sinners!",
        character: "Charlie",
        episode: "Pilot"
    },
    {
        id: 2,
        quote: "Hi there! I'm Blitzo, the 'o' is silent, and I'm the founder of I.M.P! Are you a piece of shit who got yourself sent to Hell, or are you an innocent soul who got FUCKED over by someone else?!",
        character: "Blitzo",
        episode: "Murder Family"
    }
]

const APIQuotes = () => {
    const [quoteGenerator, setQuoteGenerator] = useState([])
    const count = useRef(0)

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * sampleQuotes.length)
        setQuoteGenerator(sampleQuotes[randomIndex])
        count.current = randomIndex
    })  

  return (
    <div className="quote-container">
        <div className = "quote-generator">
            <h1 className="main-quote">{quoteGenerator.quote}</h1>
        </div>
        <div className="small-text">
            <p>- {quoteGenerator.character}</p>
            <p>Episode: {quoteGenerator.episode}</p>
        </div>
    </div>
  )
}

export default APIQuotes
