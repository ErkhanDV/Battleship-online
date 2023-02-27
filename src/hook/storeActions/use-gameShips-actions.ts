import { useAppDispatch, useLogInActions } from '@/hook/_index';
import * as shipActions from '@/store/reducers/GameShipsSlice';
import {
  IPlayerState,
  IShip,
  IGameShips,
} from '@/store/reducers/types/shipLocation';

export const useGameShipsActions = () => {
  const dispatch = useAppDispatch();
  const { setModalOpen, setModalChildren } = useLogInActions();
  const modalHandler = (component: string) => {
    setModalChildren(component);
  };

  const updateShipsLocationState = (
    state: IPlayerState,
    person: keyof IGameShips,
  ) => dispatch(shipActions.updateShipsState({ state, person }));

  const checkShoot = (person: keyof IGameShips, cell: number) => {
    modalHandler('miss');
    setModalOpen(true);
    dispatch(shipActions.addShoot({ person, cell }));
  };

  const addShip = (person: keyof IGameShips, ship: IShip) =>
    dispatch(shipActions.addShip({ person, ship }));

  const resetShips = () => dispatch(shipActions.resetShips());

  const setRandomShips = (person: keyof IGameShips, ships?: number[]) =>
    dispatch(shipActions.setRandomShips({ person, ships }));

  const resetGameShips = () => dispatch(shipActions.resetGameShips());

  const addNotAllowed = (person: keyof IGameShips, notAllowed: number[]) => {
    dispatch(shipActions.addNotAllowed({ person, notAllowed }));
  };

  return {
    updateShipsLocationState,
    checkShoot,
    addShip,
    resetShips,
    setRandomShips,
    resetGameShips,
    addNotAllowed,
  };
};
