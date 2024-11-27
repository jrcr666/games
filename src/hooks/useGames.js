import { useEffect, useContext, useState } from 'react';
import { GameContext } from '../context/GameProvider';

const API_URL =
  'https://api.rawg.io/api/games?key=49e7a8c1cd044e11a16dbdc4d009c4a1';

export const useGames = () => {
  const { games, setGames } = useContext(GameContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (games.length === 0) {
      const fetchGames = async () => {
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          setGames(data.results);
        } catch (error) {
          console.error('Error fetching games:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchGames();
    } else {
      setLoading(false);
    }
  }, [games, setGames]);

  return { games, loading, setGames };
};
