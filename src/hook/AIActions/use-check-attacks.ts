import { useAppSelector } from '../use-redux';

export const useCheckAttacks = () => {
  const { user, rival } = useAppSelector((state) => state.gameShipsSlice);

  const checkAttackToMiss = (target: number) => {
    return user.misses.includes(target);
  };

  const checkAttackToWoundedDeck = (target: number) => {
    const woundedDecksList = user.ships.map((ship) => ship.woundedCells).flat();
    return woundedDecksList.includes(target);
  };

  const checkAttackToOccupiedCell = (target: number) => {
    const killedShips = user.ships.filter(
      (ship) => ship.decks === ship.woundedCells.length,
    );
    return killedShips.some((ship) => ship.occupiedCells.includes(target));
  };

  const checkShootNotAllowed = (target: number) => {
    return user.notAllowed.includes(target);
  };

  const checkWinner = (isRival: boolean) => {
    const person = isRival ? rival : user;
    const killedShips = person.ships.filter(
      (ship) => ship.decks === ship.woundedCells.length,
    );
    return killedShips.length === 10;
  };

  const checkShootToShip = (isRival: boolean, target: number) => {
    const person = isRival ? rival : user;
    const ships = person.ships.map((ship) => ship.shipLocation);
    return ships.findIndex((coordinates) => coordinates.includes(target));
  };

  const checkAttacks = (target: number) => {
    return (
      checkAttackToMiss(target) ||
      checkAttackToWoundedDeck(target) ||
      checkAttackToOccupiedCell(target) ||
      checkShootNotAllowed(target)
    );
  };

  return { checkWinner, checkShootToShip, checkAttacks };
};
