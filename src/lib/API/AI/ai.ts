import { getRandomNum } from '@/lib/utils/getRandomNum';
import {
  IGameShips,
  IPlayerState,
  IShoot,
} from '@/store/reducers/types/shipLocation';
import {
  checkAttackToMiss,
  checkAttackToOccupiedCell,
  checkAttackToWoundedDeck,
  checkShootToShip,
  checkWinner,
} from './checkAttacks';

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
) => {
  const cloneUser = JSON.parse(JSON.stringify(user));
  const timer = getRandomNum(1500, 7000);
  const getShootTarget = (): number => {
    const target = getRandomNum(0, 99);
    if (
      checkAttackToMiss(user, target) ||
      checkAttackToWoundedDeck(user, target) ||
      checkAttackToOccupiedCell(user, target)
    ) {
      return getShootTarget();
    }
    return target;
  };
  setTimeout(() => {
    const target = getShootTarget();
    checkShoot('user', target);
    const index = checkShootToShip(cloneUser, target);
    index !== -1
      ? cloneUser.shipsLocation[index].woundedCells.push(target)
      : cloneUser.misses.push(target);
    checkWinner(cloneUser)
      ? console.log('We have a winner!')
      : console.log('Not win yet :(');
    setIsAbleShoot(true);
  }, 100);
};
