import { useContext, FC } from 'react';
import { SocketContext } from '@/context/Context';
import { useAppSelector, useGameShipsActions } from '@/hook/_index';
import Cell from '@/components/game/cell/Cell';
import { getRandomNum } from '@/lib/utils/getRandomNum';
import { FIELD, PERSON } from '@/store/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';

import './Field.scss';

const Field: FC<{ isRival: boolean; isOnline: boolean }> = ({
  isRival,
  isOnline,
}) => {
  const { sendSocket } = useContext(SocketContext);
  const { checkShoot } = useGameShipsActions();
  const { isAbleShoot, isGameFinded, isStarted } = useAppSelector(
    (state) => state.gameStateSlice,
  );

  const bgClass = `battleground ${!isAbleShoot && isRival ? 'inactive' : ''}`;

  const shootHandler = ({ target }: React.MouseEvent<HTMLDivElement>): void => {
    const shoot: number = Number((target as HTMLDivElement).id);

    if (isAbleShoot && isStarted) {
      if (isOnline) {
        sendSocket(SOCKETMETHOD.shoot, { shoot: shoot });
      } else {
        checkShoot(PERSON.rival, shoot);

        setTimeout(() => {
          checkShoot(PERSON.user, getRandomNum(1, 100));
        }, 1000);
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
