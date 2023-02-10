import Cell from '../cell/Cell';

import './row.scss';

const Battleground = ({ isRival }: { isRival?: boolean }) => {
  const battleground: string[] = new Array(100).fill('empty');
  return (
    <div className="battleground">
      {battleground.map((_, index) => (
        <Cell key={index} coordinate={index} isRival={isRival} />
      ))}
    </div>
  );
};

export default Battleground;
