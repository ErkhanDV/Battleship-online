import { useAppDispatch } from '@/hook/use-redux';
import * as shipActions from '@/store/reducers/ShipsLocationSlice';
import {
  IPlayerState,
  IShip,
  IShipsLocation,
} from '@/store/reducers/types/shipLocation';
import { SHIPS } from '@/store/_constants';

export const useShipLocationActions = () => {
  const dispatch = useAppDispatch();

  const updateShipsLocationState = (
    state: IPlayerState,
    person: keyof IShipsLocation,
  ) => dispatch(shipActions.updateShipsState({ state, person }));

  const checkShoot = (person: keyof IShipsLocation, cell: number) =>
    dispatch(shipActions.addShoot({ person, cell }));

  const addShip = (person: keyof IShipsLocation, ship: IShip) =>
    dispatch(shipActions.addShip({ person, ship }));

  const resetShips = () => dispatch(shipActions.resetShips());

  const setRandomShips = (
    person: keyof IShipsLocation,
    ships?: number[],
  ) => dispatch(shipActions.setRandomShips({ person, ships }));

  return {
    updateShipsLocationState,
    checkShoot,
    addShip,
    resetShips,
    setRandomShips,
  };
};
