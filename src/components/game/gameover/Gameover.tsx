import { useAppSelector } from '@/hook/use-redux';
import { type FC } from 'react';
import './Gameover.scss';

const Gameover: FC = () => {
  const { winner } = useAppSelector((state) => state.gameStateSlice);

  if (winner) {
    return (
      <div className="gameover">
        <span>{winner}</span>
      </div>
    );
  } else {
    return null;
  }
};

export default Gameover;
