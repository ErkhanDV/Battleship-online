import { IPlayerState } from '@/store/reducers/types/shipLocation';

export const checkAttackToMiss = (user: IPlayerState, target: number) => {
  return user.misses.includes(target);
};

export const checkAttackToWoundedDeck = (
  user: IPlayerState,
  target: number,
) => {
  const woundedDecksList = user.shipsLocation
    .map((ship) => ship.woundedCells)
    .flat();
  return woundedDecksList.includes(target);
};

export const checkAttackToOccupiedCell = (
  user: IPlayerState,
  target: number,
) => {
  const killedShips = user.shipsLocation.filter(
    (ship) => ship.decks === ship.woundedCells.length,
  );
  return killedShips.some((ship) => ship.occupiedCells.includes(target));
};

export const checkWinner = (user: IPlayerState) => {
  const killedShips = user.shipsLocation.filter(
    (ship) => ship.decks === ship.woundedCells.length,
  );
  console.log(killedShips);

  return killedShips.length === 10;
};

export const checkShootToShip = (currUser: IPlayerState, target: number) => {
  const ships = currUser.shipsLocation.map((ship) => ship.shipLocation);
  return ships.findIndex((coordinates) => coordinates.includes(target));
};
