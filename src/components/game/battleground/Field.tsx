import { useContext, FC } from 'react';
import { SocketContext } from '@/Context';
import { useAppSelector, useGameShipsActions } from '@/hook/_index';
import Cell from '@/components/game/cell/Cell';
import { getRandomNum } from '@/lib/utils/getRandomNum';
import { FIELD } from '@/store/_constants';
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

  const shootHandler = (e: React.MouseEvent): void => {
    if (e.target instanceof HTMLDivElement && e.target.id) {
      const shoot: number = Number(e.target.id);
      if (isAbleShoot && isStarted) {
        if (isOnline) {
          sendSocket(SOCKETMETHOD.shoot, { shoot: shoot });
        } else {
          checkShoot('rival', shoot);

          setTimeout(() => {
            checkShoot('user', getRandomNum(1, 100));
          }, 1000);
        }
      }
    }
  };

  return (
    <div
      onClick={shootHandler}
      style={{ opacity: !isAbleShoot && isRival ? 0.5 : 1 }}
      className="battleground"
    >
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
