import { IPlayerState } from '@/store/reducers/types/shipLocation';
import { useAppSelector } from '../use-redux';
import {
  useGameShipsActions,
  useGameStateActions,
  useLogInActions,
} from '../_index';
import { useCheckAttacks } from './use-check-attacks';
import { useComputerTurn } from './use-computer-turn';

export const useUserTurn = () => {
  const { rival, user } = useAppSelector((state) => state.gameShipsSlice);
  const { misses, ships, notAllowed } = useAppSelector(
    (state) => state.gameShipsSlice.rival,
  );

  const { checkShoot } = useGameShipsActions();
  const { computerTurn } = useComputerTurn();
  const { addNotAllowed } = useGameShipsActions();
  const { setIsAbleShoot } = useGameStateActions();
  const { checkShootToShip, checkWinner } = useCheckAttacks();
  const { setModalOpen, setModalChildren } = useLogInActions();

  const userTurn = (shoot: number) => {
    if (
      !misses.includes(shoot) &&
      !notAllowed.includes(shoot) &&
      !ships.some((ship) => ship.woundedCells.includes(shoot))
    ) {
      checkShoot('rival', shoot);
      const cloneRival: IPlayerState = JSON.parse(JSON.stringify(rival));
      const index = checkShootToShip('rival', shoot);

      if (index !== -1) {
        cloneRival.ships[index].woundedCells.push(shoot);
        const { woundedCells, decks, occupiedCells } = cloneRival.ships[index];

        if (woundedCells.length === decks) {
          addNotAllowed('rival', occupiedCells);
          console.log('Корабль компуктера убит!');
        }

        if (checkWinner(cloneRival)) {
          console.log('We have a winner!');
          setModalOpen(true);
          setModalChildren('gameover');
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
