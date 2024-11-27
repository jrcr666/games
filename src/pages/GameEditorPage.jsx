import { useMemo, useState } from 'react';
import { useGames } from '../hooks/useGames';
import GameList from '../components/GameList';
import SearchBar from '../components/SearchBar';

const GameEditorPage = () => {
  // Usamos el hook useGames para obtener el estado de los juegos (games),
  // la función para actualizar los juegos (setGames), y un indicador de carga (loading).
  const { games, setGames, loading } = useGames();

  // Usamos useState para gestionar el estado del valor de búsqueda (search) que el usuario introduce.
  const [search, setSearch] = useState('');

  // Función para clonar un juego, crea una copia del juego con un nuevo ID (usando Date.now())
  // y lo agrega al final de la lista de juegos.
  const cloneGame = (id) => {
    const gameToClone = games.find((game) => game.id === id); // Buscamos el juego por ID.
    setGames((currGames) => [...currGames, { ...gameToClone, id: Date.now() }]); // Clonamos el juego y lo agregamos a la lista.
  };

  // Función para editar un juego, recibe el ID del juego y los datos actualizados del juego.
  // Luego, actualiza el juego en el estado con los nuevos valores.
  const editGame = (id, updatedGame) => {
    setGames(
      (currGames) =>
        currGames.map((game) => (game.id === id ? updatedGame : game)) // Mapear los juegos, y si el ID coincide, actualizamos el juego.
    );
  };

  // Usamos useMemo para memorizar el resultado de la filtración de juegos por nombre,
  // lo que evita que se haga el filtrado en cada renderizado si no cambian los juegos ni el valor de búsqueda.
  const filteredGames = useMemo(
    () =>
      games.filter(
        (game) => game.name.toLowerCase().includes(search.toLowerCase()) // Filtra los juegos cuyo nombre incluya el texto de búsqueda.
      ),
    [games, search]
  );

  return (
    <div>
      <h1>Game Editor</h1>
      {/* Componente de búsqueda que recibe el valor del estado 'search' y actualiza el estado cuando cambia */}
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      {/* Si estamos cargando, mostramos un mensaje de "Cargando", sino, mostramos la lista de juegos */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <GameList games={filteredGames} onClone={cloneGame} onEdit={editGame} />
      )}
    </div>
  );
};

export default GameEditorPage;
