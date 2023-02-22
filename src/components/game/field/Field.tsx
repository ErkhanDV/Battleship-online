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
import { IPlayerState } from '@/store/reducers/types/shipLocation';
import { gameTurn } from '@/lib/API/AI/gameTurn';

const Field: FC<{ isRival: boolean; isOnline: boolean }> = ({
  isRival,
  isOnline,
}) => {
  const { sendSocket } = useContext(SocketContext);
  const { checkShoot, addNotAllowed } = useGameShipsActions();
  const { setIsAbleShoot } = useGameStateActions();
  const { isAbleShoot, isGameFinded, isStarted, gameDifficult } =
    useAppSelector((state) => state.gameStateSlice);
  const { user, rival } = useAppSelector((state) => state.gameShipsSlice);

  const shootHandler = (e: React.MouseEvent): void => {
    if (e.target instanceof HTMLDivElement && e.target.id) {
      const shoot: number = Number(e.target.id);
      if (isAbleShoot && isStarted && isRival) {
        if (isOnline) {
          sendSocket(SOCKETMETHOD.shoot, { shoot: shoot });
        } else {
          if (
            !rival.misses.includes(shoot) &&
            !rival.shipsLocation.some((ship) =>
              ship.woundedCells.includes(shoot),
            )
          ) {
            checkShoot('rival', shoot);
            const cloneRival: IPlayerState = JSON.parse(JSON.stringify(rival));
            const index = checkShootToShip(rival, shoot);
            if (index !== -1) {
              cloneRival.shipsLocation[index].woundedCells.push(shoot);
              if (
                cloneRival.shipsLocation[index].woundedCells.length ===
                cloneRival.shipsLocation[index].decks
              ) {
                const occupied = cloneRival.shipsLocation[index].occupiedCells;
                addNotAllowed('rival', occupied);
                console.log('Корабль компуктера убит!');
              }
              if (checkWinner(cloneRival)) {
                console.log('We have a winner!');
                setIsAbleShoot(false);
                return;
              }
            } else {
              setIsAbleShoot(false);
              computerTurn(
                checkShoot,
                setIsAbleShoot,
                user,
                gameDifficult,
                addNotAllowed,
              );
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
