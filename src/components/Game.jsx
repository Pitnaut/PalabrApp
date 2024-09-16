import {useState} from 'react';

const Game = () =>  {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value.toUpperCase());
  }

  return(
    <div className="user-input">
      <input
        type="text"
        maxLength={5}
        value={userInput}
        onChange={handleInputChange}
      />
    </div>
  )

};

export default Game;