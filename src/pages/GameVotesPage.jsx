import { useState, useMemo } from 'react';
import { useGames } from '../hooks/useGames';
import SearchBar from '../components/SearchBar';

const GameVotesPage = () => {
  // Usamos el hook useGames para obtener los juegos (games) y la función para actualizarlos (setGames).
  const { games, setGames } = useGames();

  // Usamos useState para gestionar el estado del valor de búsqueda (search).
  const [search, setSearch] = useState('');

  // Función para votar un juego (upvote o downvote).
  // Aumenta o disminuye el contador de votos dependiendo del tipo ('up' o 'down').
  const vote = (id, type) => {
    setGames(
      games.map(
        (game) =>
          game.id === id
            ? { ...game, votes: (game.votes || 0) + (type === 'up' ? 1 : -1) } // Si el juego tiene un ID coincidente, actualiza el contador de votos.
            : game // Si no coincide, no se hace nada con ese juego.
      )
    );
  };

  // Filtramos los juegos por nombre usando useMemo, para evitar realizar la operación en cada renderizado innecesariamente.
  // Luego, ordenamos los juegos por la cantidad de votos (de mayor a menor).
  const filteredGames = useMemo(
    () =>
      games
        .filter(
          (game) => game.name.toLowerCase().includes(search.toLowerCase()) // Filtramos los juegos cuyo nombre incluya el texto de búsqueda.
        )
        .toSorted((a, b) => (b.votes || 0) - (a.votes || 0)), // Ordenamos los juegos por la cantidad de votos, de mayor a menor.
    [games, search] // Dependencias: el filtrado y la ordenación se vuelven a ejecutar cuando cambian 'games' o 'search'.
  );

  return (
    <div>
      <h1>Game Votes</h1>
      {/* Componente de búsqueda que recibe el valor 'search' y actualiza el estado cuando cambia */}
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      {/* Mostramos la lista de juegos filtrados y ordenados */}
      <ul>
        {filteredGames.map((game) => (
          <li key={game.id}>
            <h3>{game.name}</h3> {/* Nombre del juego */}
            <img width={300} src={game.background_image} alt={game.name} />{' '}
            {/* Imagen del juego */}
            {/* Botones de votación (upvote y downvote) */}
            <button onClick={() => vote(game.id, 'up')}>Upvote</button>
            <button onClick={() => vote(game.id, 'down')}>Downvote</button>
            {/* Muestra el contador de votos */}
            <p>Votes: {game.votes || 0}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameVotesPage;
