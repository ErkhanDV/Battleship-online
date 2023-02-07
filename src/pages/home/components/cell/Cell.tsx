import { ICell } from '@/types/Types';

import { dragEndHandler, dragOverHandler, dropHadler } from '@/lib/API/DargNDrop';
import './Cell.scss';
import { useSelector } from 'react-redux';

const Cell = ({ coordinate }: ICell) => {
  const decks = useSelector((state) => state.currentShipSlice.decks);
  const isHorizontal = useSelector((state) => state.currentShipSlice.isHorizontal);

  return (
    <div
      id={coordinate.toString()}
      className="cell"
      onDragOver={(event) => dragOverHandler(event, isHorizontal, decks)}
      onDragLeave={(event) => dragEndHandler(event, isHorizontal, decks)}
      onDrop={(event) => dropHadler(event, isHorizontal, decks)}
    ></div>
  );
};

export default Cell;
