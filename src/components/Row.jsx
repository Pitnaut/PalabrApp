import "../styles/Row.scss";

export default function Row({ 
  palabra,
  marcarComoSolucion,
  marcarLetrasPresentesAusentes,
  solucion,
  bounceOnError,
}) {
  return (
    <div className={`fila ${bounceOnError && "fila--bounce"}`}>
      {palabra.split("").map(
        (letra, index) => {
          const bgClass = solucion.includes(letra) ? "presente" : "ausente";


        return (
        <div 
          className={`letra ${
            marcarComoSolucion && `correcta rotate--${index + 1}00`
          } ${
            marcarLetrasPresentesAusentes && `${bgClass} rotate--${index + 1}00`        
          } ${letra !== " " && "letra--activa"} ${solucion[index] === letra && "correcta"}`} 
            key={index}
        >
          {letra}
          <div className="back">{letra}</div>
        </div>
        );
      })}
    </div>
  )
}
