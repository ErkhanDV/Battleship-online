import { IPlayerState, IShip } from '@/store/reducers/types/shipLocation';
import { useAppSelector } from '../use-redux';
import { useGameShipsActions, useGameStateActions } from '../_index';
import { useComputerTurn } from './use-computer-turn';

export const useUserTurn = () => {
  const { rival } = useAppSelector((state) => state.gameShipsSlice);
  const { misses, ships, notAllowed } = rival;

  const { checkShoot, addNotAllowed } = useGameShipsActions();
  const { computerTurn } = useComputerTurn();
  const { setIsAbleShoot } = useGameStateActions();

  const userTurn = (shoot: number) => {
    if (
      !misses.includes(shoot) &&
      !notAllowed.includes(shoot) &&
      !ships.some((ship) => ship.woundedCells.includes(shoot))
    ) {
      checkShoot('rival', shoot);
      const cloneRival: IPlayerState = JSON.parse(JSON.stringify(rival));
      const index = ships.findIndex((ship) =>
        ship.shipLocation.includes(shoot),
      );
      if (index !== -1) {
        const ship = cloneRival.ships[index];
        ship.woundedCells.push(shoot);
        if (ship.woundedCells.length === ship.decks) {
          addNotAllowed('rival', ship.occupiedCells);
        }
        if (
          cloneRival.ships.filter(
            (ship) => ship.decks === ship.woundedCells.length,
          ).length === 10
        ) {
          console.log('You are WIN!');
        }
      } else {
        setIsAbleShoot(false);
        computerTurn();
      }
    }
  };

  return { userTurn };
};
