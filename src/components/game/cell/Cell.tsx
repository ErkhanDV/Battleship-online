import './Cell.scss';

import { useAppDispatch, useAppSelector } from '@/store/hook/hook';

import { setDropped, setShipsLocation } from '@/store/reducers/ShipsSlice';

import { dragOverHandler } from '@/lib/API/DragAndDrop/dragOver';
import { dragEndHandler } from '@/lib/API/DragAndDrop/dragEnd';
import { dropHadler } from '@/lib/API/DragAndDrop/drop';

import { ICell } from '@/types/Types';

const Cell = ({ coordinate, isRival }: ICell) => {
  const decks = useAppSelector((state) => state.shipsSlice.currentDragedShip.decks);
  const isHorizontal = useAppSelector(
    (state) => state.shipsSlice.currentDragedShip.isHorizontal,
  );

  const dispatch = useAppDispatch();
  const setLocations = (ship: number[]) => dispatch(setShipsLocation(ship));
  const successfullyDrop = () => dispatch(setDropped(true));
  const handleClick = (isRival: boolean | undefined) => {
    if (!!isRival) {
      console.log(coordinate);
    }
  };

  return (
    <div
      onClick={() => handleClick(isRival)}
      id={coordinate.toString()}
      className="cell"
      onDragOver={(event) => dragOverHandler(event, isHorizontal, decks)}
      onDragLeave={(event) => dragEndHandler(event, isHorizontal, decks)}
      onDrop={(event) =>
        dropHadler(event, isHorizontal, decks, setLocations, successfullyDrop)
      }
    ></div>
  );
};

export default Cell;
