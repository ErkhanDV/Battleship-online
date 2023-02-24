import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
  useLogInActions,
} from '@/hook/_index';
import { getRandomNum } from '@/lib/utils/getRandomNum';
import { IPlayerState, IShip } from '@/store/reducers/types/shipLocation';
import { useEffect, useState } from 'react';
import { useCheckAttacks } from './use-check-attacks';

export const useComputerTurn = () => {
  const { user, rival } = useAppSelector((state) => state.gameShipsSlice);

  const { checkShoot, addNotAllowed } = useGameShipsActions();
  const { setIsAbleShoot } = useGameStateActions();
  const { checkAttacks, checkShootToShip, checkWinner, checkDestroyShip } =
    useCheckAttacks();
  const { setModalOpen, setModalChildren } = useLogInActions();

  const timer = getRandomNum(1500, 7000);

  const getShootTarget = (): number => {
    const target = getRandomNum(0, 99);
    if (!checkAttacks(target)) {
      return getShootTarget();
    }
    return target;
  };

  const computerTurn = () => {
    setTimeout(() => {
      const target = getShootTarget();
      checkShoot('user', target);
    }, 100);
  };

  return { computerTurn };
};
