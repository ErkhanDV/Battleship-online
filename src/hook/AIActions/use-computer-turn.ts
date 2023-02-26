import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
  useAIState,
} from '@/hook/_index';
import { getRandomNum } from '@/lib/utils/getRandomNum';
import { useEffect, useState } from 'react';

export const useComputerTurn = () => {
  let { user } = useAppSelector((state) => state.gameShipsSlice);
  const { notAllowed, misses } = user;

  const { checkShoot, addNotAllowed } = useGameShipsActions();
  const { setIsAbleShoot } = useGameStateActions();
  const { availableShoots, possibleCells } = useAppSelector(
    (state) => state.AIStateSlice,
  );
  const { setAvailableShoots, setPossibleCells } = useAIState();

  const [currentShoot, setShoot] = useState<number | null>(null);
  const [hittedIndex, setHitted] = useState<number>(-1);

  useEffect(() => {
    if (currentShoot) {
      checkShoot('user', currentShoot);
      const ships = user.ships.map((ship) => ship.shipLocation);
      const index = ships.findIndex((coordinates) =>
        coordinates.includes(currentShoot),
      );
      if (index !== -1) {
        setHitted(index);
        setPossibleCells(getPossibleCells(index));
        smartComputerTurn();
      } else {
        setIsAbleShoot(true);
      }
    }
  }, [currentShoot]);

  useEffect(() => {
    if (hittedIndex !== -1) {
      const { decks, occupiedCells, woundedCells } = user.ships[hittedIndex];
      if (decks === woundedCells.length) {
        addNotAllowed('user', occupiedCells);
      }
    }
    const updatedAvailableShoots = availableShoots.filter(
      (shoot) => !notAllowed.includes(shoot),
    );
    setAvailableShoots(updatedAvailableShoots);
  }, [hittedIndex, currentShoot]);

  const getShootTarget = (): number | void => {
    if (availableShoots) {
      const index = getRandomNum(0, availableShoots.length - 1);
      return availableShoots[index];
    }
  };

  const getPossibleCells = (shoot: number) => {
    const possibleCells = [];
    if (shoot > 9) {
      possibleCells.push(shoot - 10);
    }
    if (shoot < 90) {
      possibleCells.push(shoot + 10);
    }
    if (Math.floor((shoot - 1) / 10) === Math.floor(shoot / 10)) {
      possibleCells.push(shoot - 1);
    }
    if (Math.floor((shoot + 1) / 10) === Math.floor(shoot / 10)) {
      possibleCells.push(shoot + 1);
    }
    return possibleCells.filter(
      (cell) => !notAllowed.includes(cell) && !misses.includes(cell),
    );
  };

  const changeAvailableShoots = (shoot: number) => {
    return availableShoots.filter((target) => target !== shoot);
  };

  const computerTurn = () => {
    setTimeout(() => {
      const shoot = getShootTarget();
      if (shoot) {
        setShoot(shoot);
        setAvailableShoots(changeAvailableShoots(shoot));
        console.log(currentShoot);
      }
    }, 500);
  };

  const smartComputerTurn = () => {
    setShoot(possibleCells[0]);
  };

  return { computerTurn };
};
