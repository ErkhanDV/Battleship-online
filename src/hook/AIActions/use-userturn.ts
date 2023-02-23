import { checkShootToShip, checkWinner } from '@/lib/API/AI/checkAttacks';
import {
  IAddNotAllowed,
  IGameShips,
  IPlayerState,
  IShoot,
} from '@/store/reducers/types/shipLocation';
import { useAppSelector } from '../use-redux';
import { useGameShipsActions, useGameStateActions } from '../_index';
import { useComputerTurn } from './use-computerturn';

export const useUserTurn = () => {
  const { rival } = useAppSelector((state) => state.gameShipsSlice);
  const { checkShoot } = useGameShipsActions();
  const { computerTurn } = useComputerTurn();
  const { addNotAllowed } = useGameShipsActions();
  const { setIsAbleShoot } = useGameStateActions();

  const userTurn = (shoot: number) => {
    if (
      !rival.misses.includes(shoot) &&
      !rival.ships.some((ship) => ship.woundedCells.includes(shoot))
    ) {
      checkShoot('rival', shoot);
      const cloneRival: IPlayerState = JSON.parse(JSON.stringify(rival));
      const index = checkShootToShip(rival, shoot);
      if (index !== -1) {
        cloneRival.ships[index].woundedCells.push(shoot);
        if (
          cloneRival.ships[index].woundedCells.length ===
          cloneRival.ships[index].decks
        ) {
          const occupied = cloneRival.ships[index].occupiedCells;
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
        computerTurn();
      }
    }
  };

  return { userTurn };
};
