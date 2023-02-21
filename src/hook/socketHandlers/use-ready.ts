import {
  useAppSelector,
  useGameStateActions,
  useGameShipsActions,
} from '@/hook/_index';
import { PERSON } from '@/store/_constants';
import { IReady } from '@/store/reducers/types/socket';

export const useReadyHandler = () => {
  const { setIsStarted } = useGameStateActions();
  const { updateShipsLocationState } = useGameShipsActions();
  const { userName } = useAppSelector((state) => state.gameStateSlice);

  const readyHandler = (data: IReady) => {
    console.log('ready');
    const { isStarted, field, user } = data;
    setIsStarted(!!isStarted);
    if (user !== userName) {
      updateShipsLocationState(field, PERSON.rival);
    }
  };

  return { readyHandler };
};
