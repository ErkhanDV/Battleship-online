import { FC, useMemo } from 'react';
import {
  useAppSelector,
  useDnDActions,
  useGameShipsActions,
} from '@/hook/_index';
import { dragOver, dragEnd, drop } from '@/lib/API/_index';
import { PERSON } from '@/store/_constants';
import { IShip } from '@/store/reducers/types/shipLocation';
import { ICell, TDnDHandler } from './_types';
import { CELLCLASS } from './_constants';
import { IGameShips } from '@/store/reducers/types/shipLocation';
import './Cell.scss';

const Cell: FC<ICell> = ({ coordinate, isRival }) => {
  const person = (isRival ? PERSON.rival : PERSON.user) as keyof IGameShips;

  const { addShip } = useGameShipsActions();
  const { setDropped } = useDnDActions();

  const { decks, isHorizontal } = useAppSelector(
    (state) => state.shipSlice.shipDnD,
  );
  const personState = useAppSelector((state) => state.gameShipsSlice[person]);

  const classList = useMemo(() => {
    const { shoot, initial, miss, shiper } = CELLCLASS;
    let classList = initial as string;

    personState.ships.forEach((ship) => {
      classList += ship.woundedCells.includes(coordinate) ? shoot : '';
      classList += ship.shipLocation.includes(coordinate) ? shiper : '';
      classList += ship.shipLocation.includes(coordinate) ? shiper : '';
    });

    personState.misses.forEach((id) => {
      classList += id === coordinate ? miss : '';
    });
    personState.notAllowed.forEach((id) => {
      classList += id === coordinate ? miss : '';
    });

    return classList;
  }, [personState]);

  const successfullyDrop = () => setDropped(true);
  const setLocations = (ship: IShip) => addShip(PERSON.user, ship);

  const dragOverHandler: TDnDHandler = (event) => {
    dragOver(event, isHorizontal, decks, personState.ships);
  };

  const dragEndHandler: TDnDHandler = (event) => {
    dragEnd(event, isHorizontal, decks);
  };

  // <<<<<<< HEAD
  //   const { shoot, initial, miss, ship } = CELLCLASS;

  //   let classList = initial as string;
  //   classList += isShooted ? shoot : '';
  //   classList += isMissed || isOccupied ? miss : '';
  //   classList += isShip() ? ship : '';
  // =======
  const dropHandler: TDnDHandler = (event) => {
    drop(event, isHorizontal, decks, setLocations, successfullyDrop);
  };
  // >>>>>>> develop

  return (
    <div
      id={coordinate.toString()}
      className={classList}
      onDragOver={isRival ? dragOverHandler : undefined}
      onDragLeave={isRival ? dragEndHandler : undefined}
      onDrop={isRival ? dropHandler : undefined}
    ></div>
  );
};

export default Cell;
