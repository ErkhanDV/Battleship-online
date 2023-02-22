import { IPlayerState } from '@/store/reducers/types/shipLocation';

export const checkAttackToMiss = (user: IPlayerState, target: number) => {
  return user.misses.includes(target);
};

export const checkAttackToWoundedDeck = (
  user: IPlayerState,
  target: number,
) => {
  const woundedDecksList = user.ships.map((ship) => ship.woundedCells).flat();
  return woundedDecksList.includes(target);
};

export const checkAttackToOccupiedCell = (
  user: IPlayerState,
  target: number,
) => {
  const killedShips = user.ships.filter(
    (ship) => ship.decks === ship.woundedCells.length,
  );
  return killedShips.some((ship) => ship.occupiedCells.includes(target));
};

export const checkShootNotAllowed = (user: IPlayerState, target: number) => {
  return user.notAllowed.includes(target);
};

export const checkWinner = (user: IPlayerState) => {
  const killedShips = user.ships.filter(
    (ship) => ship.decks === ship.woundedCells.length,
  );
  return killedShips.length === 10;
};

export const checkShootToShip = (currUser: IPlayerState, target: number) => {
  const ships = currUser.ships.map((ship) => ship.shipLocation);
  return ships.findIndex((coordinates) => coordinates.includes(target));
};

export const checkComputerAttack = (user: IPlayerState, target: number) => {
  return (
    checkAttackToMiss(user, target) ||
    checkAttackToWoundedDeck(user, target) ||
    checkAttackToOccupiedCell(user, target) ||
    checkShootNotAllowed(user, target)
  );
};
