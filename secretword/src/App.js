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
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]); 
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickAWordAndCategory = useCallback(() => {
    //pick category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // pick word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
      
    return {word, category};
  }, [words])

  const startGame = useCallback(() => {
    cleatLetterStates()
    setGuesses(3);
    
    const {word, category} = pickAWordAndCategory();

    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase(""));
    
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameState(stages[1].name);
  }, [pickAWordAndCategory])

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)
    ) {
      return;
    } 

    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter]);
    } else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]);
      setGuesses((actualGuesses) => actualGuesses -1);
    }

  }

  const cleatLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  // tentativas
  useEffect(() => {
    if(guesses <= 0) {
      cleatLetterStates();

      setGameState(stages[2].name);
    }
  }, [guesses])

// checar a win condition
useEffect(() => {
  // remover repetições
  const uniqueLetters = [...new Set(letters)];

  if(guessedLetters.length === uniqueLetters.length) {

    setScore((actualScore) => actualScore += 100)
    startGame();
  }

}, [guessedLetters, letters, startGame])

  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameState(stages[0].name);
  }
  

  return (
    <div className="App">
      {gameState === 'start' && <StartScreen startGame={startGame}/>}
      {gameState === 'game' && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}/>
      )}
      {gameState === 'end' && <Gameover retry={retry} score={score}/>}
    </div>
  );
}

export default App;
