import {useState, useRef, useEffect} from "react";
import "../styles/PalabrApp.scss";
import Row from "./Row";
import Keyboard from "./Keyboard";

const SOLUCION = "palco";

export default function PalabrApp() {
  const [guesses, setGuesses] = useState([
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ]);

  const palabrAppRef = useRef();

  useEffect(() => {
    palabrAppRef.current.focus()
  }, []);

  const handleKeyDown = () => {

  }

  return (
    <div className="palabrapp" ref={palabrAppRef} tabIndex="0" onBlur={(e) => {
      e.target.focus();
    }}
    onKeyDown={handleKeyDown}>
      <h1 className="titulo">PalabrApp</h1>
      <div className="notificacion"></div>
      {guesses.map((guess, index) => {
        return <Row key={index} word={guess} />;
      })}
    </div>     
  )
}
