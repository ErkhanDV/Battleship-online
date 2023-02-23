import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';
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

export const computerTurn = () =>
  // checkShoot: (
  //   person: keyof IGameShips,
  //   cell: number,
  // ) => {
  //   payload: IShoot;
  //   type: 'gameShips/addShoot';
  // },
  // setIsAbleShoot: (state: boolean) => void,
  // user: IPlayerState,
  // gameDifficult: number,
  // addNotAllowed: (
  //   person: keyof IGameShips,
  //   notAllowed: number[],
  // ) => {
  //   payload: IAddNotAllowed;
  //   type: 'gameShips/addNotAllowed';
  // },
  {
    const { gameDifficult } = useAppSelector((state) => state.gameStateSlice);
    const { user } = useAppSelector((state) => state.gameShipsSlice);
    const { checkShoot, addNotAllowed } = useGameShipsActions();
    const { setIsAbleShoot } = useGameStateActions();

    const cloneUser: IPlayerState = JSON.parse(JSON.stringify(user));
    const timer = getRandomNum(1500, 7000);
    const getShootTarget = (): number => {
      const target = getRandomNum(0, 99);
      if (checkComputerAttack(cloneUser, target)) {
        return getShootTarget();
      }
      return target;
    };
    const useTurn = () => {
      setTimeout(() => {
        const target = getShootTarget();
        checkShoot('user', target);
        gameTurn(
          // cloneUser,
          target,
          // addNotAllowed,
          // checkShootToShip,
          // checkWinner,
          // setIsAbleShoot,
          // checkShoot,
          // gameDifficult,
        );
      }, 100);
    };
    // setTimeout(() => {
    //   const target = getShootTarget();
    //   checkShoot('user', target);
    //   gameTurn(
    //     cloneUser,
    //     target,
    //     addNotAllowed,
    //     checkShootToShip,
    //     checkWinner,
    //     setIsAbleShoot,
    //     checkShoot,
    //     gameDifficult,
    //   );
    // }, 100);
    return { useTurn };
  };
