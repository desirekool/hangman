/* eslint-disable no-case-declarations */
const reducer = (state, action) => {
  const {type, payload} = action;
  const newState = {...state};
  switch(type) {
    case 'START_GAME':
      newState.word = payload.word;
      newState.guessedLetters = new Array(payload.word.length).fill(null);
      newState.hints = Math.ceil(payload.word.length / 3);
      newState.mistakeCount = 0;
      newState.gameState = null;
      if(payload.topic) newState.topic = payload.topic;
      const positions = [...payload.word.matchAll(' ')];
      const letters = [...newState.guessedLetters];
      positions.forEach((position) => {
        letters[position.index] =  ' ';
      });      
      return newState;
    case 'WRONG_GUESS':      
      newState.mistakeCount += 1;
      if(newState.mistakeCount === 6) {
        newState.gameState = 'lost';
        newState.losses += 1;
        newState.guessedLetters = newState.word.split('');
      }          
      return newState;
    case 'CORRECT_GUESS':      
      newState.guessedLetters = payload.letters;
      const fullLength = newState.guessedLetters.length;
      const revealedLength = newState.guessedLetters.filter((letter) => letter).length;
      if(payload.hintUsed)  {
        newState.hints -= 1;
      }
      if(fullLength === revealedLength) {
        newState.gameState = 'won';
        newState.wins += 1;
      }      
      return newState;

    case 'GIVE_UP':
      newState.gameState = 'lost';
      newState.losses += 1;
      newState.guessedLetters = newState.word.split('');
      return newState;
    default:
      return state;

  }
}

export default reducer;