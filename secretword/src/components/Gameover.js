import React from 'react'
import './Gameover.scss'

const Gameover = ({retry}) => {
  return (
    <div>
      <button onClick={retry}>Reiniciar</button>
    </div>
  )
}

export default Gameover