import { useAppDispatch } from '@/hook/_index';
import * as gameStateActions from '@/store/reducers/GameStateSlice';
import { IStartGame } from '@/store/reducers/types/socket';

export const useGameStateActions = () => {
  const dispatch = useAppDispatch();

  const setGameInfo = (info: IStartGame) =>
    dispatch(gameStateActions.setGameInfo(info));

  const setOpponentName = (name: string) =>
    dispatch(gameStateActions.setOpponentName(name));

  const setUserName = (name: string) =>
    dispatch(gameStateActions.setUserName(name));

  const setIsReady = (state: boolean) =>
    dispatch(gameStateActions.setReady(state));

  const setIsAbleShoot = (state: boolean) => {
    dispatch(gameStateActions.setAbleShoot(state));
  };

  const setIsGameFinded = (state: boolean) =>
    dispatch(gameStateActions.setGameFinded(state));

  const setIsStarted = (state: boolean) =>
    dispatch(gameStateActions.setStarted(state));

  const setWinner = (name: string) =>
    dispatch(gameStateActions.setWinner(name));

  const resetGameState = () => dispatch(gameStateActions.resetGameState());

  const setGameDifficult = (difficult: number) =>
    dispatch(gameStateActions.setGameDifficult(difficult));

  return {
    setWinner,
    setGameInfo,
    setOpponentName,
    setUserName,
    setIsReady,
    setIsAbleShoot,
    setIsGameFinded,
    setIsStarted,
    resetGameState,
    setGameDifficult,
  };
};