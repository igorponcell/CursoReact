import './App.css';
import { useCallback, useEffect, useState } from "react"
import { wordsList } from './data/words'
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import Gameover from './components/Gameover';

const stages =[
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]

function App() {
  const [gameState, setGameState] = useState(stages[0].name);
  const [words] = useState(wordsList);

  return (
    <div className="App">
      {gameState === 'start' && <StartScreen/>}
      {gameState === 'game' && <Game/>}
      {gameState === 'end  ' && <Gameover/>}
    </div>
  );
}

export default App;
