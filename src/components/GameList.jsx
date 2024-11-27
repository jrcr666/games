import { useState } from 'react';

// El componente GameList recibe tres props:
// - games: un array de juegos que se va a mostrar.
// - onClone: una función que se llama cuando un juego es clonado.
// - onEdit: una función que se llama cuando un juego es editado.
const GameList = ({ games, onClone, onEdit }) => {
  // Se usa un estado local 'editing' para saber qué juego se está editando.
  // Al inicio es null, lo que significa que no se está editando ningún juego.
  const [editing, setEditing] = useState(null);

  // handleEditChange maneja el cambio en el campo de entrada de edición.
  // Cuando el usuario cambia el valor del input, se actualiza el juego con el nuevo nombre.
  const handleEditChange = (e, gameId) => {
    const { value } = e.target; // Se extrae el nuevo valor del campo de texto.

    // Se busca el juego a editar a partir del ID.
    const game = games.find((game) => game.id === gameId);

    // Llamamos a la función onEdit que recibimos como prop, pasándole el ID del juego
    // y los campos actualizados (en este caso, solo 'name').
    onEdit(gameId, { ...game, name: value });
  };

  // handleEditButtonClick activa el estado de edición para el juego seleccionado.
  const handleEditButtonClick = (game) => {
    // Se establece 'editing' con el ID del juego para indicar que está en modo de edición.
    setEditing(game.id);
  };

  return (
    // Se mapea sobre los juegos para mostrar cada uno en la lista.
    <ul>
      {games.map((game) => (
        <li key={game.id}>
          {/* Nombre del juego */}
          <h3>{game.name}</h3>
          {/* Imagen del juego */}
          <img width={300} src={game.background_image} alt={game.name} />

          {/* Si el juego está siendo editado (es decir, 'editing' coincide con el ID del juego),
              mostramos un input para editar el nombre del juego. */}
          {editing === game.id ? (
            <div style={{ maxWidth: '50vw' }}>
              <input
                type='text'
                name='name'
                value={game.name} // El valor del input es el nombre actual del juego.
                onChange={(e) => handleEditChange(e, game.id)} // Llamamos a handleEditChange al cambiar el valor.
              />
            </div>
          ) : (
            // Si el juego no está siendo editado, mostramos la descripción del juego.
            <p>{game.description}</p>
          )}

          {/* Botón para clonar el juego, llama a la función onClone pasada como prop. */}
          <button onClick={() => onClone(game.id)}>Clone</button>

          {/* Si el juego no está siendo editado, mostramos el botón para editar. */}
          {editing !== game.id ? (
            <button onClick={() => handleEditButtonClick(game)}>Edit</button>
          ) : (
            // Si el juego está siendo editado, mostramos el botón de "Cancelar Edición".
            <button onClick={() => setEditing(null)}>Cancel Edit</button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default GameList;
