import { useAppDispatch } from '@/hook/use-redux';
import * as socketActions from '@/store/reducers/SocketSlice';
import { IStartGame } from '@/store/reducers/types/socket';

export const useSocketActions = () => {
  const dispatch = useAppDispatch();

  const setGameInfo = (info: IStartGame) =>
    dispatch(socketActions.setGameInfo(info));

  const setOpponentName = (name: string) =>
    dispatch(socketActions.setOpponentName(name));

  const setUserName = (name: string) =>
    dispatch(socketActions.setUserName(name));

  const setIsReady = (state: boolean) =>
    dispatch(socketActions.setReady(state));

  const setIsAbleShoot = (state: boolean) =>
    dispatch(socketActions.setAbleShoot(state));

  const setIsGameFinded = (state: boolean) =>
    dispatch(socketActions.setGameFinded(state));

  const setIsStarted = (state: boolean) =>
    dispatch(socketActions.setStarted(state));

  const setWinner = (name: string) => dispatch(socketActions.setWinner(name));

  return {
    setWinner,
    setGameInfo,
    setOpponentName,
    setUserName,
    setIsReady,
    setIsAbleShoot,
    setIsGameFinded,
    setIsStarted,
  };
};
