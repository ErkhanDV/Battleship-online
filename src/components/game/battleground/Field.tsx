import { FC } from 'react';
import { useAppSelector } from '@/hook/_index';
import Cell from '@/components/game/cell/Cell';
import { FIELD } from '@/store/_constants';

import './field.scss';

const Field: FC<{ isRival: boolean }> = ({ isRival }) => {
  const { isAbleShoot, isGameFinded } = useAppSelector(
    (state) => state.socketSlice,
  );

  return (
    <div
      style={{ opacity: isAbleShoot && isRival ? 0.5 : 1 }}
      className="battleground"
    >
      {FIELD.map((_, index) => (
        <Cell key={index} coordinate={index} isRival={isRival} />
      ))}
      {isGameFinded || !isRival ? null : (
        <div className="connection">Waiting for opponent...</div>
      )}
    </div>
  );
};

export default Field;
