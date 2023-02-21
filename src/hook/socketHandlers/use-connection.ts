import {
  useAppSelector,
  useGameStateActions,
  useGameShipsActions,
} from '@/hook/_index';
import { PERSON } from '@/store/_constants';
import { IStartGame, IConnect } from '@/store/reducers/types/socket';

export const useConnectionHandler = () => {
  const { setIsAbleShoot, setIsGameFinded, setIsReady, setOpponentName } =
    useGameStateActions();
  const { updateShipsLocationState } = useGameShipsActions();
  const { userName } = useAppSelector((state) => state.gameStateSlice);

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
      setIsAbleShoot(isAbleShoot);
    }

    setIsGameFinded(isGameFinded);
    console.log('connection');
  };

  return { connectHandler };
};
