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

  const changeTurn = (userTurn: boolean) => {
    dispatch(gameState.changeTurn(userTurn));
  };

  const changeGameDifficulty = (gameDifficulty: number) => {
    dispatch(gameState.changeGameDifficulty(gameDifficulty));
  };

  return {
    changeGameMode,
    setWinGame,
    changeGameStatus,
    changeTurn,
    changeGameDifficulty,
  };
};
