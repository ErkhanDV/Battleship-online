import { useAppSelector, useGameShipsActions } from '@/hook/_index';
import { getRandomNum } from '@/lib/utils/getRandomNum';
import { FIELD } from '@/store/_constants';
import { useEffect, useState } from 'react';
import { useCheckAttacks } from './use-check-attacks';

export const useComputerTurn = () => {
  const { user } = useAppSelector((state) => state.gameShipsSlice);

  const { checkShoot } = useGameShipsActions();
  const { checkAttacks } = useCheckAttacks();

  const cellsList = FIELD.map((_, i) => i);

  const [availableShoots, setAvailableShoot] = useState(cellsList);

  useEffect(() => {
    const availableCellsList = cellsList.filter((item) =>
      checkAttacks(user, item),
    );
    setAvailableShoot(availableCellsList);
  }, [user]);

  const getShootTarget = (): number => {
    const index = getRandomNum(0, availableShoots.length - 1);
    return availableShoots[index];
  };

  const computerTurn = () => {
    const target = getShootTarget();
    checkShoot('user', target);
  };

  return { computerTurn };
};
