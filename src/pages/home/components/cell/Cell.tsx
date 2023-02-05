import { ICell } from '@/types/Types';

import { dragEndHandler, dragOverHandler, dropHadler } from '../../../../lib/API/DargNDrop';
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
      onDrop={(event) => dropHadler(event)}
      onDragLeave={(event) => dragEndHandler(event)}
      // onDragEnd={(event) => dragEndHandler(event)}
      onDragOver={(event) => dragOverHandler(event)}
    ></div>
  );
};

export default Cell;
