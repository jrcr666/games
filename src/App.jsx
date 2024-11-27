import { useState } from 'react';
import GameEditorPage from './pages/GameEditorPage';
import GameVotesPage from './pages/GameVotesPage';
import './App.css';

const initializePath = () => {
  const path = new URL(window.location).pathname.replace('/', '');

  if (!path) {
    window.history.pushState({}, '', 'editor');

    return 'editor';
  }

  return path;
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(initializePath);

  const handleNavigation = (page) => {
    window.history.pushState({}, '', `/${page}`);
    setCurrentPage(page);
  };

  const renderPage = () => {
    return (
      { editor: <GameEditorPage />, votes: <GameVotesPage /> }[currentPage] || (
        <h1>404 - Página no encontrada</h1>
      )
    );
  };

  return (
    <div>
      <nav>
        <button onClick={() => handleNavigation('editor')}>
          Editor de Juegos
        </button>
        <button onClick={() => handleNavigation('votes')}>Votar Juegos</button>
      </nav>
      <div className='container'>{renderPage()}</div>
    </div>
  );
};

export default App;
