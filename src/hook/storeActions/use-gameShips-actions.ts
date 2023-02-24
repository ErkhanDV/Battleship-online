import {
  useAppDispatch,
  useAppSelector,
  useGameStateActions,
} from '@/hook/_index';
import * as shipActions from '@/store/reducers/GameShipsSlice';
import {
  IPlayerState,
  IShip,
  IGameShips,
} from '@/store/reducers/types/shipLocation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useGameShipsActions = () => {
  const dispatch = useAppDispatch();
  const { user, rival } = useAppSelector((state) => state.gameShipsSlice);
  const { setIsAbleShoot } = useGameStateActions();
  const [destroyedShips, setDestroyedShips] = useState<number>(0);

  useEffect(() => {
    console.log(destroyedShips);

    if (destroyedShips === 10) {
      console.log('Winner!');
      setIsAbleShoot(false);
      return;
    }
  }, [destroyedShips]);

  const updateShipsLocationState = (
    state: IPlayerState,
    person: keyof IGameShips,
  ) => dispatch(shipActions.updateShipsState({ state, person }));

  const checkShoot = (person: keyof IGameShips, cell: number) => {
    dispatch(shipActions.addShoot({ person, cell }));
  };

  const checkSPShoot = (person: keyof IGameShips, cell: number) => {
    const key = person === 'user' ? user : rival;
    const ships = key.ships.map((ship) => ship.shipLocation);
    const index = ships.findIndex((coordinates) => coordinates.includes(cell));
    if (index !== -1) {
      dispatch(shipActions.addSPHit({ person, index, cell }));
      const ship = key.ships[index];
      if (ship.decks - 1 === ship.woundedCells.length) {
        addNotAllowed(person, ship.occupiedCells);
      }
    } else {
      dispatch(shipActions.addSPMiss({ person, cell }));
    }
  };

  const addShip = (person: keyof IGameShips, ship: IShip) =>
    dispatch(shipActions.addShip({ person, ship }));

  const resetShips = () => dispatch(shipActions.resetShips());

  const setRandomShips = (person: keyof IGameShips, ships?: number[]) =>
    dispatch(shipActions.setRandomShips({ person, ships }));

  const resetGameShips = () => dispatch(shipActions.resetGameShips());

  const addNotAllowed = async (
    person: keyof IGameShips,
    notAllowed: number[],
  ) => {
    console.log('addNotAllowed сработал');
    await setDestroyedShips((prev) => prev + 1);
    dispatch(shipActions.addNotAllowed({ person, notAllowed }));
  };

  return {
    updateShipsLocationState,
    checkShoot,
    checkSPShoot,
    addShip,
    resetShips,
    setRandomShips,
    resetGameShips,
    addNotAllowed,
  };
};
