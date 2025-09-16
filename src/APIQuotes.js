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
    },
    {
        id: 3,
        quote: "It's not an act!! It's who I need to be. And this... This is my escape! Where I can forget about it all! How much I hate... everything. A place where I can get high, and not have to think about how much it hurts. And maybe... If I can ruin myself enough in the process... if I end up broken, I won't be his favorite toy anymore... And maybe he'll let me go...",
        character: "Angel Dust",
        episode: "Masquerade"
    },
    {
        id: 4, 
        quote: "Blitzo, I'm giving you this because.. I care, very deeply for you. And, I have for some time, but this.. transactional thing we have.. is not right anymore; it hasn't been, it never was. And now.. all I can see is how wrong it is to be so.. tethered to someone in such an unfair way. And, not know how they feel. But, I want you to continue to... be who you are. Your business. You don't have to stay here with me.. but, I want you to. I want you to stay here with me, because you want to.. only if you want to.",
        character: "Stolas",
        episode: "The Full Moon"
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
