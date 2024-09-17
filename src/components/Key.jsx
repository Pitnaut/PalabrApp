export default function Key({
  estaAusente,
  estaPresente,
  estaCorrecta,
  letra,
  escribeLetra,
}) {
  return (
    <div 
      className={`key ${estaAusente && "key--ausente"} ${
        estaPresente && "key--presente"
      } ${estaCorrecta && "key--correcta"}`}
      onClick={() => escribeLetra(letra)}
    >
      {letra}
    </div>
  )
}
