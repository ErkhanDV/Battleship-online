import './Cell.scss';

import { useAppDispatch, useAppSelector } from '@/store/hook/hook';

import { setDropped } from '@/store/reducers/CurrentShipSlice';
import { addShip } from '@/store/reducers/ShipsLocationSlice';

import { dragOverHandler } from '@/lib/API/DragAndDrop/dragOver';
import { dragEndHandler } from '@/lib/API/DragAndDrop/dragEnd';
import { dropHadler } from '@/lib/API/DragAndDrop/drop';

import { ICell } from '@/types/Types';
import { IShip } from '@/store/_types';

const Cell = ({ coordinate, isRival }: ICell) => {
  const decks = useAppSelector(
    (state) => state.currentShip.currentDragedShip.decks,
  );
  const isHorizontal = useAppSelector(
    (state) => state.currentShip.currentDragedShip.isHorizontal,
  );
  const isShooted = useAppSelector((state) =>
    state.shoots.rival.hits.some((id) => id === coordinate),
  );
  const isMissed = useAppSelector((state) =>
    state.shoots.rival.misses.some((id) => id === coordinate),
  );

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

  return (
    <div
      onClick={() => handleClick(isRival)}
      id={coordinate.toString()}
      className={classList}
      onDragOver={(event) => dragOverHandler(event, isHorizontal, decks)}
      onDragLeave={(event) => dragEndHandler(event, isHorizontal, decks)}
      onDrop={(event) =>
        dropHadler(event, isHorizontal, decks, setLocations, successfullyDrop)
      }
    ></div>
  );
};

export default Cell;
