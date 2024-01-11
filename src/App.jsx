import Header from './components/Header'
import Footer from './components/Footer.jsx'
import TopicLabel from './components/TopicLabel.jsx';
import Hangman from './components/Hangman.jsx';
import Letters from './components/Letters.jsx';
import Keyboard  from './components/Keyboard.jsx';
import AlertBox from './components/AlertBox.jsx';
import { useEffect, useReducer } from 'react';
import reducer from './reducer';
import data from "./words.json"

const initialState = {
  wins: 0,
  losses: 0,
  word:null,
  guessedLetters: [],
  topic: "animal",
  hints: 0,
  mistakeCount: 0,
  gameState: null,
}

const wordGenerator = (topic) => {
  const words = data[topic];
  const index = Math.floor(Math.random() * words.length);  
  return words[index].toUpperCase();
}

const  App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateTopic = state ? state.topic : 'animal';

  const startGame = () => {
    dispatch({
      type: 'START_GAME', 
      payload: { word: wordGenerator(stateTopic), topic: stateTopic }
    });
  }
    
  useEffect(() => {           
    startGame();
  }, []);
  
  const checkGuess = (letter, hintUsed = false) => {
    if (state.word.includes(letter)) {
      const positions = [...state.word.matchAll(letter)];
      const letters = [...state.guessedLetters];
      positions.forEach((position) => {
        letters[position.index] = letter;
      });
      
      dispatch({ type: 'CORRECT_GUESS', payload: { letters, hintUsed } });
    } else {
      dispatch({ type: 'WRONG_GUESS'  });
    }
  }

  const handleGiveUp = () => {
    dispatch({ type: 'GIVE_UP' });
  }

  const handleKeyClick = (letter) => {
    checkGuess(letter);  
  };

  const changeTopic = (topic) => {
    dispatch({
      type: 'START_GAME', 
      payload: { word: wordGenerator(topic), topic }
    });
  }

  const handleHint = () => {
    const allLetters = [...new Set(state.word.split(''))];
    const revealedLetters = state.guessedLetters.filter((x) => x);
    const unrevealedLetters = allLetters.filter((x) => !revealedLetters.includes(x));
    const hintLetter = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)];
    
    checkGuess(hintLetter, true);
  }

  return (
    <div className='flex flex-col h-screen'>
      <Header navLinks={Object.keys(data)} onNavLinkClick={changeTopic}/>
      <main className='flex-1 flex'>
        <div className='flex-[2] bg-slate-200 flex items-center flex-col gap-8 p-10'>
          <TopicLabel topic={state.topic} />
          <Letters letters={state.guessedLetters} />
          {state.gameState==null ? <><Keyboard onClick={handleKeyClick} />
          <div className='btn-group'>
            <button className='btn btn-error' onClick={handleGiveUp}>Give up</button>
            <button className='btn disabled:opacity-30' disabled={state.hints < 1} onClick={handleHint}>
              hint <span className='btn-label'>{state.hints}</span>
            </button>
          </div></> : 
          <AlertBox gamestate={state.gameState} wins={state.wins} losses={state.losses} onRestart={startGame} />}
        </div> 
        
        <div className='flex-[1] '>
          <Hangman stage={state.mistakeCount}/>
        </div>
      </main>
      <Footer />
    </div>    
  );
}

export default App;
