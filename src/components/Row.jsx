import "../styles/Row.scss";

export default function Row({ 
  palabra,
  aplicarRotacion,
  solucion,
  bounceOnError,
}) {
  return (
    <div className={`fila ${bounceOnError && "fila--bounce"}`}>
      {palabra.split("").map(
        (letra, index) => {
          const bgClass = 
            solucion[index] === letra
            ? "correcta" 
            : solucion.includes(letra) 
            ? "presente" 
            : "ausente";


        return (
        <div 
          className={`letra ${bgClass} ${
            aplicarRotacion && `rotate--${index + 1}00`
          } ${letra !== " " && "letra--activa"}`} 
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
