import { useState } from "react";

const Key = ({letter, onClick} ) => {
  const [ disabled, setDisabled ] = useState(false);

  const handleClick = (letter) => {
    setDisabled(!disabled);
    onClick(letter);
  }

  return <button disabled={disabled} onClick={() => handleClick(letter)} className="key">
          {letter}
        </button>
}

const Keyboard = ({ onClick } ) => {
  const keys = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  return (
    <div className="keyboard">
      {keys.map((row, index) => {
        return (
          <div key={"row" + index} className="keys-row">
            {row.split("").map((key) => <Key key={key} letter={key} onClick={() => onClick(key)} />)}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;