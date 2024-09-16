export const obtenerPalabra = async () => {
  const fetchPalabra = async () => {
    try {
      const respuesta = await fetch('https://random-word-api.herokuapp.com/word?lang=es&length=5');
      const data = await respuesta.json();
      return data[0];  // Aquí, data es una palabra como cadena de texto
    } catch (error) {
      console.error('Error al obtener la palabra:', error);
      throw error;
    }
  };

  const esValida = (palabra) => /^[a-z]+$/.test(palabra); //Se quitan mayúsuculas para nombres propios y símbolos
  
  //Busca una palabra usando fetchPalabra, si no es válida busca otra
  let palabra;
  do {
    palabra = await fetchPalabra();
    if (!esValida(palabra)) {
      console.log('Palabra no válida detectada, reintentando...');
    }
  } while (!esValida(palabra));

  return palabra.toUpperCase(); 
};