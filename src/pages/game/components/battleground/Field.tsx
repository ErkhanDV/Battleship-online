import Cell from '../cell/Cell';

import './field.scss';

const Field = ({ isRival }: { isRival?: boolean }) => {
  const field: string[] = new Array(100).fill('empty');
  return (
    <div className="battleground">
      {field.map((_, index) => (
        <Cell key={index} coordinate={index} isRival={isRival} />
      ))}
    </div>
  );
};

export default Field;
