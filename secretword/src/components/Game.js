import React from 'react'
import './Game.scss'

const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}) => {
  return (
    <div className='game'>
      <p className='points'>
        <span>Pontuação: {score}</span>
      </p>
      
      <h1>Adivinhe a palavra!</h1>
      <h3 className='tip'>
        Dica da palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>

      <div className='word-container'>
        {console.log(letters)}
        {letters.map((l, i) => {
          return guessedLetters.includes(l) ? (
            <span key={i} className='letter'>{l}</span>
          ) : (
            <span key={i} className='blank-square'></span>
          )
        })}
      </div>
      <div className='letter-container'>
        <p>Tente adivinhar uma letra!</p>
        <form>
          <input type='text' name='letter' maxLength="1" required></input>
          <button>Jogar!</button>
        </form>
      </div>
      
      <div className='wrong-letter-container'>
        <p>Letras já utilizadas: 
          <span>
            {wrongLetters.map((l, i) => { return <span key={i}>{l}, </span>})}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Game