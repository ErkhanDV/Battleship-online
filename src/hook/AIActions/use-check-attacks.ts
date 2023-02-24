import { IGameShips, IPlayerState } from '@/store/reducers/types/shipLocation';
import { useAppSelector } from '../use-redux';

export const useCheckAttacks = () => {
  const { user, rival } = useAppSelector((state) => state.gameShipsSlice);

  const checkAttackToMiss = (target: number) => {
    return !user.misses.includes(target);
  };

  const checkAttackToWoundedDeck = (target: number) => {
    const woundedDecksList = user.ships.map((ship) => ship.woundedCells).flat();
    return !woundedDecksList.includes(target);
  };

  const checkAttackToOccupiedCell = (target: number) => {
    const killedShips = user.ships.filter(
      (ship) => ship.decks === ship.woundedCells.length,
    );
    return !killedShips.some((ship) => ship.occupiedCells.includes(target));
  };

  const checkShootNotAllowed = (target: number) => {
    return !user.notAllowed.includes(target);
  };

  const checkWinner = (person: IPlayerState) => {
    const killedShips = person.ships.filter(
      (ship) => ship.decks === ship.woundedCells.length,
    );
    return killedShips.length === 10;
  };

  const checkShootToShip = (person: keyof IGameShips, target: number) => {
    const personKey = person === 'rival' ? rival : user;
    const ships = personKey.ships.map((ship) => ship.shipLocation);
    return ships.findIndex((coordinates) => coordinates.includes(target));
  };

  const checkAttacks = (target: number) => {
    return (
      checkAttackToMiss(target) &&
      checkAttackToWoundedDeck(target) &&
      checkAttackToOccupiedCell(target) &&
      checkShootNotAllowed(target)
    );
  };

  const checkDestroyShip = () => {
    const { ships } = user;
    return ships.filter((ship) => ship.decks === ship.woundedCells.length);
  };

  return { checkWinner, checkShootToShip, checkAttacks, checkDestroyShip };
};
