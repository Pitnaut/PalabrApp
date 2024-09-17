import {useState, useRef, useEffect} from "react";
import "../styles/PalabrApp.scss";
import Row from "./Row";
import Keyboard from "./Keyboard";
import { LETRAS, palabras } from "../data/palabrasYLetras";

const SOLUCION = palabras[Math.floor(Math.random() * palabras.length)];

export default function PalabrApp() {
  const [guesses, setGuesses] = useState([
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ]);
  const [solucionEncontrada, setSolucionEncontrada] = useState(false);
  const [letraActivaIndex, setLetraActivaIndex] = useState(0);
  const [notificacion, setNotificacion] = useState("");
  const [filaActivaIndex, setFilaActivaIndex] = useState(0);
  const [guessesFallados, setguessesFallados] = useState([]);
  const [letrasCorrectas, setLetrasCorrectas] = useState([]);
  const [letrasPresentes, setLetrasPresentes] = useState([]);
  const [letrasAusentes, setLetrasAusentes] = useState([]);

  const palabrAppRef = useRef();

  useEffect(() => {
    palabrAppRef.current.focus()
  }, []);

  const escribeLetra = (letra) => {
    if (letraActivaIndex < 5) {
      setNotificacion("");

      let newGuesses = [...guesses];
      newGuesses[filaActivaIndex] = reemplazarCaracter(
        newGuesses[filaActivaIndex], 
        letraActivaIndex,
      letra
    );

      setGuesses(newGuesses);
      setLetraActivaIndex(index => index + 1);
    }
  };

  const reemplazarCaracter = (string, index, reemplazo) => {
    return string.slice(0, index) + reemplazo + string.slice(index + reemplazo.length)
  }

  const darAlEnter = () => {
    if (letraActivaIndex === 5) {
      const guessActual = guesses[filaActivaIndex];

      if (!palabras.includes(guessActual)) {
        setNotificacion("La palabra no está en la lista");
      } else if (guessesFallados.includes(guessActual)) {
        setNotificacion("Palabra repetida");
      } else if (guessActual === SOLUCION) {
        setSolucionEncontrada(true);
        setNotificacion("¡Bien hecho!");
        setLetrasCorrectas([...SOLUCION]);
      } else {
        let letrasCorrectas = [];

        [...guessActual].forEach((letra, index) => {
          if (SOLUCION[index] === letra) letrasCorrectas.push(letra);
        });

        setLetrasCorrectas([...new Set(letrasCorrectas)]);

        setLetrasPresentes([
          ...new Set([
            ...letrasPresentes, 
            ...[...guessActual].filter((letra) => SOLUCION.includes(letra)),
          ]),
        ]);

        setLetrasAusentes([
          ...new Set([
            ...letrasAusentes, 
            ...[...guessActual].filter((letra) => !SOLUCION.includes(letra)),
          ]),
        ]);

        setguessesFallados([...guessesFallados, guessActual]);

        setFilaActivaIndex((index) => index + 1);

        setLetraActivaIndex(0);

      }
    } else {
      setNotificacion("Solo palabras de 5 letras")
    }
  };

  const borrar = () => {
    setNotificacion("");

    if (guesses[filaActivaIndex][0] !== " ") {
      const newGuesses = [...guesses];

      newGuesses[filaActivaIndex] = reemplazarCaracter(
        newGuesses[filaActivaIndex], 
        letraActivaIndex - 1, 
        " "
      );

      setGuesses(newGuesses);
      setLetraActivaIndex((index) => index - 1);
    }
  };

  const handleKeyDown = (event) => {
    if (solucionEncontrada) return;

    if(LETRAS.includes(event.key)) {
      escribeLetra(event.key);
      return;
    }

    if (event.key === "Enter") {
      darAlEnter();
      return;
    }

    if (event.key === "Backspace") {
      borrar();
    }
  }

  return (
    <div className="palabrapp" ref={palabrAppRef} tabIndex="0" onBlur={(e) => {
      e.target.focus();
    }}
    onKeyDown={handleKeyDown}>
      <h1 className="titulo">PalabrApp</h1>
      <div className={`notificacion ${solucionEncontrada && "notificacion--green"}`}>
        {notificacion}
      </div>
      {guesses.map((guess, index) => {
        return (
          <Row 
            key={index} 
            palabra={guess} 
            marcarComoSolucion={solucionEncontrada && filaActivaIndex === index}
            marcarLetrasPresentesAusentes={filaActivaIndex > index}
            solucion={SOLUCION}
            bounceOnError={
              notificacion !== "¡Bien hecho!" && 
              notificacion !== "" && 
              filaActivaIndex === index
            } 
          />
        );
      })}
      <Keyboard 
        letrasPresentes={letrasPresentes}
        letrasCorrectas={letrasCorrectas}
        letrasAusentes={letrasAusentes}
        escribeLetra={escribeLetra}
        darAlEnter={darAlEnter}
        borrar={borrar} 
      />
    </div>     
  )
}
