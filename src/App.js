import { useState, useEffect } from "react";
import IMG1 from "./assets/landsby.jpeg"
import IMG2 from "./assets/mine-brdr.jpeg"
import IMG3 from "./assets/nastja-01.jpg"
import IMG4 from "./assets/nongPort.jpg"
import IMG5 from "./assets/stefan-01.jpg"
import IMG6 from "./assets/stefan-02.jpg"
import OneCard from "./components/OneCard";
import './App.css';

const cardImages = [//defined outside the component, in order to be not rerendered
  {"src": IMG1, matched: false},
  {"src": IMG2, matched: false},
  {"src": IMG3, matched: false},
  {"src": IMG4, matched: false},
  {"src": IMG5, matched: false},
  {"src": IMG6, matched: false},
]

function App() {

  const [myCards, setMyCards] = useState([])
  const [myTurns, setMyTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [dis, setDis] = useState(false)


  const getStarted = () => {
    const mixCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((myCard) => ({ ...myCard, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setMyCards(mixCards)
    setMyTurns(0)
  }

  //handle choice
  const handleChoice = (myCard) => {
    choiceOne ? setChoiceTwo(myCard) : setChoiceOne(myCard)
  }

  

  //comparing two selected cards
  //husk at denne hook gonna hire the function whenever this component (<App />) is mounted!
  useEffect(()=>{
    if (choiceOne && choiceTwo) {
      //After we made the both choices, and before comparison, I'd like to make my cards not able to flip!
      setDis(true)
      if(choiceOne.src === choiceTwo.src){
        setMyCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  //reset choices
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setMyTurns(prevTurns => prevTurns + 1)
    //after the comparison is done, I can make the cards able to flip again!
    setDis(false)
  }

  //let's fire the game automatically instead of waiting the user to click on the button!
  useEffect(() => {
    getStarted()
  }, [])

  return (
    <div className="App">
      <h1>Gå og Match</h1>
      <button onClick={getStarted}>Nyt Spil</button>

      <div className="card-grid">
        {myCards.map((myCard) => (
          <OneCard 
            handleChoice={handleChoice} 
            key={myCard.id} 
            myCard={myCard}
            flip={myCard === choiceOne || myCard === choiceTwo || myCard.matched}
            notFlip={dis}
          />
        ))}
      </div>
      <p>Dine Ture: {myTurns}</p>
    </div>
  );
}

export default App;
