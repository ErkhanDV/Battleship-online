import { useAppDispatch, useAppSelector } from '@/hook/use-redux';
import { setDropped } from '@/store/reducers/currentShipSlice';
import { addShip } from '@/store/reducers/shipsLocationSlice';
import { dragOverHandler } from '@/lib/API/DragAndDrop/dragOver';
import { dragEndHandler } from '@/lib/API/DragAndDrop/dragEnd';
import { dropHadler } from '@/lib/API/DragAndDrop/drop';
import { ICell, IShip } from '@/store/_types';
import './Cell.scss';

const Cell = ({ coordinate, isRival }: ICell) => {
  const decks = useAppSelector(
    (state) => state.currentShipSlice.currentDragedShip.decks,
  );
  const isHorizontal = useAppSelector(
    (state) => state.currentShipSlice.currentDragedShip.isHorizontal,
  );
  const isShooted = useAppSelector((state) =>
    state.shipsLocationSlice.shipsLocation.find((ship) =>
      ship.woundedCells.includes(coordinate),
    ),
  );
  const isMissed = useAppSelector((state) =>
    state.shipsLocationSlice.misses.some((id) => id === coordinate),
  );
  const settedShips = useAppSelector(
    (state) => state.shipsLocationSlice.shipsLocation,
  );
  const isShip = () => {
    const index = settedShips.findIndex((ship) =>
      ship.shipLocation.some((id) => id === coordinate),
    );
    if (index === -1) {
      return false;
    }
    return true;
  };

  const dispatch = useAppDispatch();
  const setLocations = (ship: IShip) => dispatch(addShip(ship));
  const successfullyDrop = () => dispatch(setDropped(true));
  const handleClick = (isRival: boolean | undefined) => {
    if (!!isRival) {
      console.log(coordinate);
    }
  };
  let classList = 'cell';
  if (isShooted && !isRival) {
    classList += ' hit';
  }
  if (isMissed && !isRival) {
    classList += ' miss';
  }
  if (isShip()) {
    classList += ' ship-1';
  }

  return (
    <div
      onClick={() => handleClick(isRival)}
      id={coordinate.toString()}
      className={classList}
      onDragOver={(event) =>
        dragOverHandler(event, isHorizontal, decks, settedShips)
      }
      onDragLeave={(event) => dragEndHandler(event, isHorizontal, decks)}
      onDrop={(event) =>
        dropHadler(event, isHorizontal, decks, setLocations, successfullyDrop)
      }
    ></div>
  );
};

export default Cell;
