import {useState} from 'react';
import '../stylesheets/Game.css';

const InputWord = () =>  {
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

export default InputWord;