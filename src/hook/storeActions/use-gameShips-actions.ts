import { useAppDispatch } from '@/hook/_index';
import * as shipActions from '@/store/reducers/GameShipsSlice';
import {
  IPlayerState,
  IShip,
  IGameShips,
} from '@/store/reducers/types/shipLocation';
import usePopUp from './use-popup-actions';

export const useGameShipsActions = () => {
  const dispatch = useAppDispatch();
  const { setVision, setPopUpMessage } = usePopUp();

  const updateShipsLocationState = (
    state: IPlayerState,
    person: keyof IGameShips,
  ) => dispatch(shipActions.updateShipsState({ state, person }));

  // const checkShoot = (person: keyof IGameShips, cell: number) => {
  //   const personKey = person === 'user' ? user : rival;
  //   const ships = personKey.ships.map((ship) => ship.shipLocation);
  //   const index = ships.findIndex((coordinates) => coordinates.includes(cell));
  //   if (index !== -1) {
  //     if (person === 'rival') {
  //       setVision(true), setPopUpMessage('Попал!');
  //     }

  //     dispatch(shipActions.addShoot({ person, cell, index }));
  //   } else {
  //     if (person === 'rival') {
  //       setVision(true), setPopUpMessage('Промах!');
  //     }

  //     dispatch(shipActions.addMiss({ person, cell }));
  //   }
  // };

  const checkShoot = (person: keyof IGameShips, cell: number) => {
    dispatch(shipActions.addShoot({ person, cell }));
  };

  const addShip = (person: keyof IGameShips, ship: IShip) =>
    dispatch(shipActions.addShip({ person, ship }));

  const resetShips = () => dispatch(shipActions.resetShips());

  const setRandomShips = (person: keyof IGameShips, ships?: number[]) =>
    dispatch(shipActions.setRandomShips({ person, ships }));

  const resetGameShips = () => dispatch(shipActions.resetGameShips());

  const addNotAllowed = (
    person: keyof IGameShips,
    notAllowed: number[],
    decks: number,
  ) => {
    if (person === 'rival') {
      setVision(true),
        setPopUpMessage(
          `Уничтожен ${decks === 1 ? 'однопалубный' : `${decks}-хпалубный!`}`,
        );
    }
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
