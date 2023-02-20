import { useContext, useEffect, type FC } from 'react';
import { SocketContext } from '@/Context';
import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';
import { Field } from '../_index';
import { getRandomNum } from '@/lib/utils/getRandomNum';
import { SOCKETMETHOD } from '@/services/axios/_constants';

const RivalField: FC<{ isOnline: boolean }> = ({ isOnline }) => {
  const { sendSocket } = useContext(SocketContext);
  const { opponentName, isAbleShoot, isStarted, gameDifficult } =
    useAppSelector((state) => state.gameStateSlice);

  const { checkShoot } = useGameShipsActions();
  const { setIsAbleShoot } = useGameStateActions();

  const shootHandler = (e: React.MouseEvent): void => {
    if (e.target instanceof HTMLDivElement && e.target.id) {
      const shoot: number = Number(e.target.id);
      if (isAbleShoot && isStarted) {
        if (isOnline) {
          sendSocket(SOCKETMETHOD.shoot, { shoot: shoot });
        } else {
          checkShoot('rival', shoot);
          setIsAbleShoot(false);
          setTimeout(() => {
            checkShoot('user', getRandomNum(0, 99));
            setIsAbleShoot(true);
          }, 2000);
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
