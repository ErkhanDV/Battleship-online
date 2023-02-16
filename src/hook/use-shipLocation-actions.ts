import { useAppDispatch } from '@/hook/use-redux';
import * as shipActions from '@/store/reducers/shipsLocationSlice';
import { IPlayerState, IShip } from '@/store/reducers/types/shipLocation';

export const useShipLocationActions = () => {
  const dispatch = useAppDispatch();

  const updatePerson = (state: IPlayerState, person: string) =>
    dispatch(shipActions.updateShipsLocationState({ state, person }));

  const checkShoot = (player: string, cell: number) =>
    dispatch(shipActions.addShoot({ player, cell }));

  const addShip = (ship: IShip) =>
    dispatch(shipActions.addShip({ player: 'user', ship }));

  return {
    updatePerson,
    checkShoot,
    addShip
  };
};
