import { ICell } from '@/types/Types';

import { dragEndHandler, dragOverHandler, dropHadler } from '@/lib/API/DargNDrop';
import './Cell.scss';

const Cell = ({ coordinate, cell }: ICell) => {
  const classList = ['cell'];
  if (cell === 'ship') {
    classList.push('ship');
  }

  return (
    <div
      id={coordinate.toString()}
      className={classList.join(' ')}
      onDragOver={(event) => dragOverHandler(event, false, 1)}
      onDragLeave={(event) => dragEndHandler(event, false, 1)}
      onDrop={(event) => dropHadler(event, false, 1)}
    ></div>
  );
};

export default Cell;
