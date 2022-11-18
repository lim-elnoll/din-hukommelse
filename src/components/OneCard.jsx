import './OneCard.css'
import COVER from "../assets/cover.jpg"


export default function OneCard({ myCard, handleChoice, flip, notFlip }) {

  const handleClick = () => {
    if(!notFlip){
      handleChoice(myCard)
    }
  }
  return (
    <div className="card">
      <div className={flip ? 'flip' : ''/*'' means that it gonna have no class*/}>
        <img className="front" src={myCard.src} alt="Kortet forfra" />
        <img 
          className="back" 
          onClick={handleClick} 
          src={COVER} 
          alt="Kortet bagfra" 
        />
      </div>
    </div>
  )
}
