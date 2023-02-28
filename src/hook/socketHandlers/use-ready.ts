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
  const { userName } = useAppSelector((state) => state.logInSlice);

  const readyHandler = (data: IReady) => {
    console.log(data);
    console.log('ready');
    const { isStarted, field, user } = data;
    setIsStarted(!!isStarted);
    if (user !== userName) {
      updateShipsLocationState(field, PERSON.rival);
    } else {
      updateShipsLocationState(field, PERSON.user);
    }
  };

  return { readyHandler };
};
