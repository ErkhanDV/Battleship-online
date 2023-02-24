import { useAppSelector } from '../use-redux';
import { useGameShipsActions, useGameStateActions } from '../_index';
import { useComputerTurn } from './use-computer-turn';

export const useUserTurn = () => {
  const { misses, ships, notAllowed } = useAppSelector(
    (state) => state.gameShipsSlice.rival,
  );

  const { checkSPShoot } = useGameShipsActions();
  const { computerTurn } = useComputerTurn();
  const { setIsAbleShoot } = useGameStateActions();

  const userTurn = (shoot: number) => {
    if (
      !misses.includes(shoot) &&
      !notAllowed.includes(shoot) &&
      !ships.some((ship) => ship.woundedCells.includes(shoot))
    ) {
      checkSPShoot('rival', shoot);
      setIsAbleShoot(false);
      computerTurn();
    }
  };

  return { userTurn };
};
