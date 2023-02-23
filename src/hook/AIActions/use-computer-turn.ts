import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';
import { getRandomNum } from '@/lib/utils/getRandomNum';
import { useCheckAttacks } from './use-check-attacks';

export const useComputerTurn = () => {
  const { ships } = useAppSelector((state) => state.gameShipsSlice.user);

  const { checkShoot, addNotAllowed } = useGameShipsActions();
  const { setIsAbleShoot } = useGameStateActions();
  const { checkAttacks, checkShootToShip, checkWinner } = useCheckAttacks();

  const timer = getRandomNum(1500, 7000);

  const getShootTarget = (): number => {
    const target = getRandomNum(0, 99);
    if (checkAttacks(target)) {
      return getShootTarget();
    }
    return target;
  };

  const computerTurn = () => {
    setTimeout(() => {
      const target = getShootTarget();
      checkShoot('user', target);

      const index = checkShootToShip(false, target);
      console.log(index);

      if (index !== -1) {
        const { woundedCells, decks, occupiedCells } = ships[index];
        if (woundedCells.length === decks) {
          addNotAllowed('user', occupiedCells);
          console.log('Корабль чаловека убит!');
        }

        if (checkWinner(false)) {
          console.log('We have a winner!');
          setIsAbleShoot(false);
          return;
        }
        computerTurn();
      }

      setIsAbleShoot(true);
    }, 100);
  };

  return { computerTurn };
};
