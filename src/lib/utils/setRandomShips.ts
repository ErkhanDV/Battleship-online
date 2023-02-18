import { getCorrectShip } from '@/lib/API/ShipsPlacer/ShipsPlacer';

import { IAddShip, IShip } from '@/store/reducers/types/shipLocation';

export const setRandomShips = (
  shipsLocation: IShip[],
  ships: number[],
  player: string,
  callback: (
    player: string,
    ship: IShip,
  ) => {
    payload: IAddShip;
    type: 'shipsLocation/addShip';
  },
) => {
  const settedShips = [...shipsLocation];
  const newShips: IShip[] = [];
  ships.forEach((ship) => {
    getCorrectShip(settedShips, newShips, ship);
  });
  newShips.forEach((ship) => callback(player, ship));
};
