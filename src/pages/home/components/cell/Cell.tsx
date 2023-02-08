import './Cell.scss';

import { dropHadler } from '@/lib/API/DargNDrop';

import { useAppDispatch, useAppSelector } from '@/store/hook/hook';

import { setShipsLocation } from '@/store/reducers/ShipsLocation';

import { ICell } from '@/types/Types';
import { dragOverHandler } from '@/lib/API/DragAndDrop/dragOver';
import { dragEndHandler } from '@/lib/API/DragAndDrop/dragEnd';

const Cell = ({ coordinate }: ICell) => {
  const decks = useAppSelector((state) => state.currentShip.decks);
  const isHorizontal = useAppSelector((state) => state.currentShip.isHorizontal);

  const dispatch = useAppDispatch();
  const setLocations = (ship: number[]) => dispatch(setShipsLocation(ship));

  return (
    <div
      id={coordinate.toString()}
      className="cell"
      onDragOver={(event) => dragOverHandler(event, isHorizontal, decks)}
      onDragLeave={(event) => dragEndHandler(event, isHorizontal, decks)}
      onDrop={(event) => dropHadler(event, isHorizontal, decks, setLocations)}
    ></div>
  );
};

export default Cell;
