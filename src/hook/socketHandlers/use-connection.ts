import {
  useAppSelector,
  useGameStateActions,
  useGameShipsActions,
} from '@/hook/_index';
import { PERSON } from '@/store/_constants';
import { IStartGame, IConnect } from '@/store/reducers/types/socket';
import { WINNER } from './_constants';

export const useConnectionHandler = () => {
  const {
    setIsAbleShoot,
    setWinner,
    setIsGameFinded,
    setIsReady,
    setOpponentName,
  } = useGameStateActions();
  const { updateShipsLocationState } = useGameShipsActions();
  const { userName } = useAppSelector((state) => state.logInSlice);

  const connectHandler = (data: IStartGame & IConnect) => {
    const {
      isAbleShoot,
      isGameFinded,
      field,
      user,
      opponentName,
      opponentField,
    } = data;

    if (user.name !== userName) {
      setOpponentName(user.name);
    } else {
      setIsAbleShoot(isAbleShoot);

      if (field) {
        setIsReady(true);
        updateShipsLocationState(field, PERSON.user);
      }

      if (opponentName) {
        setOpponentName(opponentName);
      }

      if (opponentField) {
        updateShipsLocationState(opponentField, PERSON.rival);
      }
    }

    setIsGameFinded(isGameFinded);

    if (data.isReconnect && user.name !== userName) {
      setWinner(WINNER.reconnect);

      setTimeout(() => {
        setWinner('');
      }, 1000);
    }

    console.log('connection');
  };

  return { connectHandler };
};
