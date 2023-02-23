import { useAppSelector, useGameShipsActions } from '@/hook/_index';
import { checkComputerAttack } from '@/lib/API/AI/checkAttacks';
import { getRandomNum } from '@/lib/utils/getRandomNum';
import { IPlayerState } from '@/store/reducers/types/shipLocation';
import { useGameTurn } from './use-gameturn';

export const useComputerTurn = () => {
  const { user } = useAppSelector((state) => state.gameShipsSlice);
  const { checkShoot } = useGameShipsActions();
  const { gameTurn } = useGameTurn();

  const cloneUser: IPlayerState = JSON.parse(JSON.stringify(user));
  const timer = getRandomNum(1500, 7000);
  const getShootTarget = (): number => {
    const target = getRandomNum(0, 99);
    if (checkComputerAttack(cloneUser, target)) {
      return getShootTarget();
    }
    return target;
  };

  const computerTurn = () => {
    setTimeout(() => {
      const target = getShootTarget();
      checkShoot('user', target);
      gameTurn(target);
    }, 100);
  };

  return { computerTurn };
};
