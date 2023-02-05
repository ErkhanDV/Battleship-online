import { ICell } from '@/types/Types';
import { useEffect, useRef, useState } from 'react';
import { dragEndHandler, dragOverHandler, dropHadler } from '../../../../lib/API/DargNDrop';
import './Cell.scss';

const Cell = ({ battlefield, setBattlefield, coordinate, cell, coordinates }: ICell) => {
  const classList = ['cell'];
  if (cell === 'ship') {
    classList.push('ship');
  }
  const [ownCoordinates, setOwnCoordinates] = useState({ x: 0, y: 0 });
  const cellRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    const corr = cellRef.current.getBoundingClientRect();
    const coors = {
      x: corr.x,
      y: corr.y,
    };
    setOwnCoordinates(coors);
    if (
      coordinates &&
      ownCoordinates.x >= coordinates.x - 30 &&
      ownCoordinates.x <= coordinates.x &&
      ownCoordinates.y >= coordinates.y - 30 &&
      ownCoordinates.y <= coordinates.y + 60
    ) {
      cellRef.current.classList.add('ship-111');
    }
  }, [ownCoordinates]);

  return (
    <div
      ref={cellRef}
      id={coordinate.toString()}
      className={classList.join(' ')}
      onDrop={(event) => dropHadler(event)}
      onDragLeave={(event) => dragEndHandler()}
      onDragEnd={(event) => dragEndHandler()}
      onDragOver={(event) => dragOverHandler(event)}
      // onClick={(event) => console.log(event.target.getBoundingClientRect())}
    ></div>
  );
};

export default Cell;
