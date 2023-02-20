import { useContext, type FC } from 'react';
import { SocketContext } from '@/Context';
import { useAppSelector, useGameShipsActions } from '@/hook/_index';
import { Field } from '../_index';
import { getRandomNum } from '@/lib/utils/getRandomNum';
import { SOCKETMETHOD } from '@/services/axios/_constants';

const RivalField: FC<{ isOnline: boolean }> = ({ isOnline }) => {
  const { sendSocket } = useContext(SocketContext);
  const { opponentName, isAbleShoot, isStarted } = useAppSelector(
    (state) => state.gameStateSlice,
  );

  const { checkShoot } = useGameShipsActions();

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
    <div onClick={shootHandler} className="field">
      <h2 className="field_name">{isOnline ? opponentName : 'Computer'}</h2>
      <Field isRival={true} />
    </div>
  );
};

export default RivalField;
