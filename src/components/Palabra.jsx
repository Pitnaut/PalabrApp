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
      <p>{palabra}</p>
    </div>
  );
};

export default Palabra;