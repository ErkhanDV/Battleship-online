import { getRandomNum } from '@/lib/utils/getRandomNum';
import {
  IAddNotAllowed,
  IGameShips,
  IPlayerState,
  IShoot,
} from '@/store/reducers/types/shipLocation';
import {
  checkComputerAttack,
  checkShootToShip,
  checkWinner,
} from './checkAttacks';
import { gameTurn } from './gameTurn';

export const computerTurn = (
  checkShoot: (
    person: keyof IGameShips,
    cell: number,
  ) => {
    payload: IShoot;
    type: 'gameShips/addShoot';
  },
  setIsAbleShoot: (state: boolean) => void,
  user: IPlayerState,
  difficult: number,
  addNotAllowed: (
    person: keyof IGameShips,
    notAllowed: number[],
  ) => {
    payload: IAddNotAllowed;
    type: 'gameShips/addNotAllowed';
  },
) => {
  const cloneUser: IPlayerState = JSON.parse(JSON.stringify(user));
  const timer = getRandomNum(1500, 7000);
  const getShootTarget = (): number => {
    const target = getRandomNum(0, 99);
    if (checkComputerAttack(user, target)) {
      return getShootTarget();
    }
    return target;
  };
  setTimeout(() => {
    const target = getShootTarget();
    checkShoot('user', target);
    gameTurn(
      cloneUser,
      target,
      addNotAllowed,
      checkShootToShip,
      checkWinner,
      setIsAbleShoot,
      checkShoot,
      difficult,
    );
  }, 100);
};
