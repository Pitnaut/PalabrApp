import { useState, useEffect } from 'react';
import { obtenerPalabra } from '../services/getWord';

const Palabra = () => {
  const [palabra, setPalabra] = useState('');

  useEffect(() => {
    const fetchPalabra = async () => {
      try {
        const palabraObtenida = await obtenerPalabra(); // Usa la función modificada
        setPalabra(palabraObtenida);
      } catch (error) {
        console.error('Error en la llamada API:', error);
      }
    };

    fetchPalabra();
  }, []);

  return (
    <div className='palabra'>
      <h1>{palabra}</h1>
    </div>
  );
};

export default Palabra;