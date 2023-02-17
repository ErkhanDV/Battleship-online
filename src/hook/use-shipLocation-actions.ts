import { useAppDispatch } from '@/hook/use-redux';
import * as shipActions from '@/store/reducers/ShipsLocationSlice';
import { IPlayerState, IShip } from '@/store/reducers/types/shipLocation';

export const useShipLocationActions = () => {
  const dispatch = useAppDispatch();

  const updateShipsLocationState = (state: IPlayerState, person: string) =>
    dispatch(shipActions.updateShipsLocationState({ state, person }));

  const checkShoot = (player: string, cell: number) =>
    dispatch(shipActions.addShoot({ player, cell }));

  const addShip = (player: string, ship: IShip) =>
    dispatch(shipActions.addShip({ player, ship }));

  const resetShips = () => dispatch(shipActions.resetShips());

  return {
    updateShipsLocationState,
    checkShoot,
    addShip,
    resetShips,
  };
};
