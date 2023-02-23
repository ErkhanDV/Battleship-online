import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';
import { checkShootToShip, checkWinner } from '@/lib/API/AI/checkAttacks';
import { useComputerTurn } from './use-computerturn';

export const useGameTurn = () => {
  const { addNotAllowed } = useGameShipsActions();
  const { user } = useAppSelector((state) => state.gameShipsSlice);
  const { setIsAbleShoot } = useGameStateActions();
  const { computerTurn } = useComputerTurn();

  const gameTurn = (target: number) => {
    const index = checkShootToShip(user, target);
    if (index !== -1) {
      user.ships[index].woundedCells.push(target);
      if (user.ships[index].woundedCells.length === user.ships[index].decks) {
        const occupied = user.ships[index].occupiedCells;
        addNotAllowed('user', occupied);
        console.log('Корабль чаловека убит!');
      }
      if (checkWinner(user)) {
        console.log('We have a winner!');
        setIsAbleShoot(false);
        return;
      }
      computerTurn();
    }
    setIsAbleShoot(true);
  };
  return { gameTurn };
};
