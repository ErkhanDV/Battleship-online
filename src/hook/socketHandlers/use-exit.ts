import { useNavigate } from 'react-router-dom';
import { useGameStateActions, useGameShipsActions } from '@/hook/_index';
import { ROUTE } from '@/router/_constants';

export const useExitHandler = () => {
  const navigate = useNavigate();
  const { setWinner, resetGameState } = useGameStateActions();
  const { resetGameShips } = useGameShipsActions();

  const exitHandler = () => {
    setWinner('Противник вышел из боя');
    setTimeout(() => {
      navigate(ROUTE.home);
      setWinner('');
    }, 3000);

    resetGameState();
    resetGameShips();
  };

  return { exitHandler };
};
