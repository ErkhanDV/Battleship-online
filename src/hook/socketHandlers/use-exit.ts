import { useNavigate, useLocation } from 'react-router-dom';
import {
  useGameStateActions,
  useGameShipsActions,
  useChatActions,
} from '@/hook/_index';
import { ROUTE } from '@/router/_constants';

export const useExitHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setWinner, resetGameState } = useGameStateActions();
  const { resetGameShips } = useGameShipsActions();
  const { resetGameChat } = useChatActions();

  const exitHandler = () => {
    console.log('exit');
    setWinner('Противник вышел из боя');
    setTimeout(() => {
      if (location.pathname === ROUTE.game) navigate(ROUTE.home);
      setWinner('');
      resetGameChat();
    }, 3000);

    resetGameState();
    resetGameShips();
  };

  return { exitHandler };
};
