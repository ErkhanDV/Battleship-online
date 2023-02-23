import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';
import {
  IAddNotAllowed,
  IGameShips,
  IPlayerState,
  IShoot,
} from '@/store/reducers/types/shipLocation';
import { computerTurn } from './ai';
import { checkShootToShip, checkWinner } from './checkAttacks';

export const useGameTurn = (target: number) =>
  // user: IPlayerState,
  // target: number,
  // addNotAllowed: (
  //   person: keyof IGameShips,
  //   notAllowed: number[],
  // ) => {
  //   payload: IAddNotAllowed;
  //   type: 'gameShips/addNotAllowed';
  // },
  // checkShootToShip: (currUser: IPlayerState, target: number) => number,
  // checkWinner: (user: IPlayerState) => boolean,
  // setIsAbleShoot: (state: boolean) => void,
  // checkShoot: (
  //   person: keyof IGameShips,
  //   cell: number,
  // ) => {
  //   payload: IShoot;
  //   type: 'gameShips/addShoot';
  // },
  // difficult: number,
  {
    const { checkShoot, addNotAllowed } = useGameShipsActions();
    const { user } = useAppSelector((state) => state.gameShipsSlice);
    const { setIsAbleShoot } = useGameStateActions();

    const gameTurn = () => {
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
    // const index = checkShootToShip(user, target);
    // if (index !== -1) {
    //   user.ships[index].woundedCells.push(target);
    //   if (user.ships[index].woundedCells.length === user.ships[index].decks) {
    //     const occupied = user.ships[index].occupiedCells;
    //     addNotAllowed('user', occupied);
    //     console.log('Корабль чаловека убит!');
    //   }
    //   if (checkWinner(user)) {
    //     console.log('We have a winner!');
    //     setIsAbleShoot(false);
    //     return;
    //   }
    //   computerTurn(checkShoot, setIsAbleShoot, user, difficult, addNotAllowed);
    // }
    // setIsAbleShoot(true);
    return { gameTurn };
  };
