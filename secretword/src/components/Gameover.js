import React from 'react'
import './Gameover.scss'

const Gameover = ({retry}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={retry}>Reiniciar</button>
    </div>
  )
}

export default Gameover