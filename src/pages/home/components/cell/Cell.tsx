import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import './Cell.scss';

import { dragEndHandler, dragOverHandler, dropHadler } from '@/lib/API/DargNDrop';

import { setShipsLocation } from '@/store/reducers/ShipsLocation';

import { ICell } from '@/types/Types';

const Cell = ({ coordinate }: ICell) => {
  const decks = useSelector((state) => state.currentShip.decks);
  const isHorizontal = useSelector((state) => state.currentShip.isHorizontal);

  const dispatch = useDispatch();
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
