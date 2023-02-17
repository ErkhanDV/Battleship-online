import { useAppDispatch } from './use-redux';
import * as gameState from '@/store/reducers/GameStateSlice';

export const useGameStateActions = () => {
  const dispatch = useAppDispatch();

  const changeGameMode = (singlePlayer: boolean) => {
    dispatch(gameState.changeGameMode(singlePlayer));
  };

  const setWinGame = (isWin: boolean) => {
    dispatch(gameState.changeGameMode(isWin));
  };

  const changeGameStatus = (isStarted: boolean) => {
    dispatch(gameState.changeGameStatus(isStarted));
  };

  return {
    changeGameMode,
    setWinGame,
    changeGameStatus,
  };
};
