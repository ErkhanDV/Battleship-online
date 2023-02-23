import { useContext, FC } from 'react';
import { SocketContext } from '@/context/Context';
import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';

import Cell from '@/components/game/cell/Cell';
import { FIELD } from '@/store/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';

import './Field.scss';

import { useUserTurn } from '@/hook/AIActions/use-userturn';

const Field: FC<{ isRival: boolean; isOnline: boolean }> = ({
  isRival,
  isOnline,
}) => {
  const { sendSocket } = useContext(SocketContext);
  const { checkShoot, addNotAllowed } = useGameShipsActions();
  const { setIsAbleShoot } = useGameStateActions();
  const { userTurn } = useUserTurn();

  const { isAbleShoot, isGameFinded, isStarted, gameDifficult } =
    useAppSelector((state) => state.gameStateSlice);
  const { user, rival } = useAppSelector((state) => state.gameShipsSlice);
  const bgClass = `battleground ${!isAbleShoot && isRival ? 'inactive' : ''}`;

  const shootHandler = ({ target }: React.MouseEvent<HTMLDivElement>): void => {
    const shoot: number = Number((target as HTMLDivElement).id);

    if (isAbleShoot && isStarted && isRival) {
      if (isOnline && sendSocket) {
        sendSocket(SOCKETMETHOD.shoot, { shoot: shoot });
      } else {
        // userTurn(
        //   rival,
        //   shoot,
        //   checkShoot,
        //   checkShootToShip,
        //   addNotAllowed,
        //   checkWinner,
        //   setIsAbleShoot,
        //   gameDifficult,
        //   user,
        // );
        userTurn(shoot);
      }
    }
  };

  return (
    <div onClick={shootHandler} className={bgClass}>
      {FIELD.map((_, index) => (
        <Cell key={index} coordinate={index} isRival={isRival} />
      ))}
      {isGameFinded || !isRival ? null : (
        <div className="connection">Waiting for an opponent...</div>
      )}
    </div>
  );
};

export default Field;
