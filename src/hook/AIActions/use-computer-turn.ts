import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';
import { getRandomNum } from '@/lib/utils/getRandomNum';
import { FIELD } from '@/store/_constants';
import { useCallback, useEffect, useState } from 'react';
import { useCheckAttacks } from './use-check-attacks';

export const useComputerTurn = () => {
  const { user } = useAppSelector((state) => state.gameShipsSlice);

  const { checkSPShoot } = useGameShipsActions();
  const { checkAttacks } = useCheckAttacks();
  const { setIsAbleShoot } = useGameStateActions();

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
    setTimeout(() => {
      const target = getShootTarget();
      checkSPShoot('user', target);
      const ships = user.ships.map((ship) => ship.shipLocation);
      const index = ships.findIndex((coordinates) =>
        coordinates.includes(target),
      );
      if (index !== -1) {
        computerTurn();
      } else {
        setIsAbleShoot(true);
      }
    }, 500);
  };

  return { computerTurn };
};
