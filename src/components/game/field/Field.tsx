import { useContext, FC, useEffect, useMemo } from 'react';
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
import { checkShootToShip, checkWinner } from '@/lib/API/AI/checkAttacks';

const Field: FC<{ isRival: boolean; isOnline: boolean }> = ({
  isRival,
  isOnline,
}) => {
  const { sendSocket } = useContext(SocketContext);
  const { checkShoot } = useGameShipsActions();
  const { setIsAbleShoot } = useGameStateActions();
  const { isAbleShoot, isGameFinded, isStarted, gameDifficult } =
    useAppSelector((state) => state.gameStateSlice);
  const { user, rival } = useAppSelector((state) => state.gameShipsSlice);

  const shootHandler = (e: React.MouseEvent): void => {
    if (e.target instanceof HTMLDivElement && e.target.id) {
      const shoot: number = Number(e.target.id);
      if (isAbleShoot && isStarted) {
        if (isOnline) {
          sendSocket(SOCKETMETHOD.shoot, { shoot: shoot });
        } else {
          if (
            !rival.misses.includes(Number(e.target.id)) &&
            !rival.shipsLocation.some((ship) =>
              ship.woundedCells.includes(Number(e.target.id)),
            )
          ) {
            checkShoot('rival', shoot);
            const cloneRival = JSON.parse(JSON.stringify(rival));
            const index = checkShootToShip(cloneRival, shoot);
            if (index !== -1) {
              cloneRival.shipsLocation[index].woundedCells.push(shoot);
              if (checkWinner(cloneRival)) {
                console.log('We have a winner!');
                return;
              }
              cloneRival.misses.push(shoot);
              setIsAbleShoot(false);
              computerTurn(checkShoot, setIsAbleShoot, user, gameDifficult);
            }
          }
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
