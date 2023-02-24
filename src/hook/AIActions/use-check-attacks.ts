import { IGameShips, IPlayerState } from '@/store/reducers/types/shipLocation';
import { useAppSelector } from '../use-redux';

export const useCheckAttacks = () => {
  const { user, rival } = useAppSelector((state) => state.gameShipsSlice);

  const checkAttackToMiss = (person: IPlayerState, target: number) => {
    return !person.misses.includes(target);
  };

  const checkAttackToWoundedDeck = (person: IPlayerState, target: number) => {
    const woundedDecksList = person.ships.map((ship) => ship.woundedCells).flat();
    return !woundedDecksList.includes(target);
  };

  const checkAttackToOccupiedCell = (person: IPlayerState, target: number) => {
    const killedShips = person.ships.filter(
      (ship) => ship.decks === ship.woundedCells.length,
    );
    return !killedShips.some((ship) => ship.occupiedCells.includes(target));
  };

  const checkShootNotAllowed = (person: IPlayerState, target: number) => {
    return !person.notAllowed.includes(target);
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

  const checkAttacks = (person: IPlayerState, target: number) => {
    return (
      checkAttackToMiss(person, target) &&
      checkAttackToWoundedDeck(person, target) &&
      checkAttackToOccupiedCell(person, target) &&
      checkShootNotAllowed(person, target)
    );
  };

  const checkDestroyShip = (person: IPlayerState, index: number) => {
    return (
      person.ships[index].decks === person.ships[index].woundedCells.length
    );
  };

  return { checkWinner, checkShootToShip, checkAttacks, checkDestroyShip };
};
