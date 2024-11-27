import { createContext, useEffect, useState } from 'react';

// Creamos un contexto de juegos, para compartir el estado de los juegos en la aplicación.
export const GameContext = createContext();

const GameProvider = ({ children }) => {
  // Usamos el hook useState para almacenar el estado de los juegos. Al inicio,
  // intentamos recuperar los juegos del localStorage, y si no existen,
  // inicializamos con un array vacío.
  const [games, setGames] = useState(
    () => JSON.parse(localStorage.getItem('games')) || [] // Carga los juegos del localStorage si existen.
  );

  // pero realmente no hace falta en este caso ya que games ya está inicializado
  // en el estado del hook, pero lo dejamos por si necesitas más lógica más tarde.
  useEffect(() => {
    // Si es necesario realizar alguna acción al cargar los juegos,
    // podemos hacerlo aquí, pero en este caso no hace nada.
    if (games) setGames(games); // Este setGames parece innecesario y redundante.
  }, []); // Este useEffect se ejecutará solo una vez al montar el componente.

  // Se guarda el estado actualizado de los juegos en el localStorage para
  // persistir los datos entre recargas de la página.
  useEffect(() => {
    // Cuando 'games' cambia, se actualiza el localStorage con el nuevo estado.
    localStorage.setItem('games', JSON.stringify(games));
  }, [games]); // Este useEffect se ejecutará cada vez que 'games' cambie.

  return (
    // El valor del contexto se establece aquí para que cualquier componente
    <GameContext.Provider value={{ games, setGames }}>
      {children}
    </GameContext.Provider>
  );
};

// Exportamos el GameProvider para que pueda ser usado en otros archivos.
export { GameProvider };
