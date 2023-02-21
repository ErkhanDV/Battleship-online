import { useContext, FC } from 'react';
import { SocketContext } from '@/Context';
import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';
import Cell from '@/components/game/cell/Cell';
import { FIELD } from '@/store/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';

import './Field.scss';
import { computerTurn } from '@/lib/API/AI/ai';

const Field: FC<{ isRival: boolean; isOnline: boolean }> = ({
  isRival,
  isOnline,
}) => {
  const { sendSocket } = useContext(SocketContext);
  const { checkShoot } = useGameShipsActions();
  const { setIsAbleShoot } = useGameStateActions();
  const { isAbleShoot, isGameFinded, isStarted } = useAppSelector(
    (state) => state.gameStateSlice,
  );
  const { user } = useAppSelector((state) => state.gameShipsSlice);

  const shootHandler = (e: React.MouseEvent): void => {
    if (e.target instanceof HTMLDivElement && e.target.id) {
      const shoot: number = Number(e.target.id);
      if (isAbleShoot && isStarted) {
        if (isOnline) {
          sendSocket(SOCKETMETHOD.shoot, { shoot: shoot });
        } else {
          checkShoot('rival', shoot);
          
          setIsAbleShoot(false);
          computerTurn(checkShoot, setIsAbleShoot, user);
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
