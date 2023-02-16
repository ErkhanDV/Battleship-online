import { useAppDispatch } from '@/hook/use-redux';
import * as shipActions from '@/store/reducers/ShipsLocationSlice';
import {
  IGameState,
  IPlayerState,
  IShip,
} from '@/store/reducers/types/shipLocation';

export const useShipLocationActions = () => {
  const dispatch = useAppDispatch();

  const updateShipsLocationState = (state: IPlayerState, person: string) =>
    dispatch(shipActions.updateShipsLocationState({ state, person }));

  const checkShoot = (player: string, cell: number) =>
    dispatch(shipActions.addShoot({ player, cell }));

  const addShip = (ship: IShip) =>
    dispatch(shipActions.addShip({ player: 'user', ship }));

  return {
    updateShipsLocationState,
    checkShoot,
    addShip,
  };
};
