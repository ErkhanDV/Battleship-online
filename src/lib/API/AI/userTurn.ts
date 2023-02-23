import {
  IAddNotAllowed,
  IGameShips,
  IPlayerState,
  IShoot,
} from '@/store/reducers/types/shipLocation';
import { computerTurn } from './ai';

export const userTurn = (
  rival: IPlayerState,
  shoot: number,
  checkShoot: (
    person: keyof IGameShips,
    cell: number,
  ) => {
    payload: IShoot;
    type: 'gameShips/addShoot';
  },
  checkShootToShip: (currUser: IPlayerState, target: number) => number,
  addNotAllowed: (
    person: keyof IGameShips,
    notAllowed: number[],
  ) => {
    payload: IAddNotAllowed;
    type: 'gameShips/addNotAllowed';
  },
  checkWinner: (user: IPlayerState) => boolean,
  setIsAbleShoot: (state: boolean) => void,
  difficult: number,
  user: IPlayerState,
) => {
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
      // computerTurn();
      computerTurn(checkShoot, setIsAbleShoot, user, difficult, addNotAllowed);
    }
  }
};
