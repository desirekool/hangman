// type alertBoxProps = {gamestate: string, wins: number, losses: number, onRestart: () => void }

const AlertBox = ({gamestate, wins, losses, onRestart}) => {  
  const gameStates= {
    won: "You Won!",
    lost: "You Lost!",
    gaveup: "You Gave up!",
  };

  return (
    <div className={"alert-box " + (gamestate === 'won' ? "alert-success" : "alert-error")}>
      <h6>{gameStates[gamestate]}</h6>
      <p>
        You have played {wins + losses} games<br />
        You won {wins} games<br />
        You lost {losses} games        
      </p>
      <button onClick={onRestart} className="btn btn-white">Start New Game</button>
    </div>
  );
};

export default AlertBox;