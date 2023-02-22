import {
  IAddNotAllowed,
  IGameShips,
  IPlayerState,
  IShoot,
} from '@/store/reducers/types/shipLocation';
import { computerTurn } from './ai';

export const gameTurn = (
  cloneUser: IPlayerState,
  target: number,
  addNotAllowed: (
    person: keyof IGameShips,
    notAllowed: number[],
  ) => {
    payload: IAddNotAllowed;
    type: 'gameShips/addNotAllowed';
  },
  checkShootToShip: (currUser: IPlayerState, target: number) => number,
  checkWinner: (user: IPlayerState) => boolean,
  setIsAbleShoot: (state: boolean) => void,
  checkShoot: (
    person: keyof IGameShips,
    cell: number,
  ) => {
    payload: IShoot;
    type: 'gameShips/addShoot';
  },
  difficult: number,
) => {
  const index = checkShootToShip(cloneUser, target);
  if (index !== -1) {
    cloneUser.shipsLocation[index].woundedCells.push(target);
    if (
      cloneUser.shipsLocation[index].woundedCells.length ===
      cloneUser.shipsLocation[index].decks
    ) {
      const occupied = cloneUser.shipsLocation[index].occupiedCells;
      addNotAllowed('user', occupied);
      console.log('Корабль чаловека убит!');
    }
    if (checkWinner(cloneUser)) {
      console.log('We have a winner!');
      setIsAbleShoot(false);
      return;
    }
    computerTurn(
      checkShoot,
      setIsAbleShoot,
      cloneUser,
      difficult,
      addNotAllowed,
    );
  }
  setIsAbleShoot(true);
};
