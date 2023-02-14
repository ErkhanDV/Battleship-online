import { useAppDispatch, useAppSelector } from '@/hook/use-redux';
import Cell from '@/components/game/cell/Cell';

import './field.scss';

const Field = ({
  isRival,
  isAbleShoot = true,
  isStarted = true,
}: {
  isStarted?: boolean;
  isRival?: boolean;
  isAbleShoot?: boolean;
}) => {
  const field = useAppSelector(
    (state) => state.shipsLocationSlice.shipsLocation,
  );
  return (
    <div
      style={{ opacity: isAbleShoot && isStarted ? 1 : 0.5 }}
      className="battleground"
    >
      {field.map((_, index) => (
        <Cell key={index} coordinate={index} isRival={isRival} />
      ))}
    </div>
  );
};

export default Field;
