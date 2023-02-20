import { useAppSelector } from '@/hook/_index';
import { useMemo } from 'react';

export const useGetSettedShips = () => {
  const { shipsLocation } = useAppSelector(
    (state) => state.gameShipsSlice.user,
  );
  const restShips = useMemo(() => {
    const shipsList = shipsLocation.map((ship) => ship.decks);
    const shipsSetter = shipsList.reduce(
      (acc, curr) => {
        acc[curr as keyof typeof acc].pop();
        return acc;
      },
      { 4: [4], 3: [3, 3], 2: [2, 2, 2], 1: [1, 1, 1, 1] },
    );
    return Object.values(shipsSetter)
      .flat()
      .sort((a, b) => b - a);
  }, [shipsLocation]);

  return { restShips };
};
