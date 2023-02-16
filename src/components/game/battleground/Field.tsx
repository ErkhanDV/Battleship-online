import { FC } from 'react';
import { useAppSelector } from '@/hook/_index';
import Cell from '@/components/game/cell/Cell';
import { FIELD } from '@/store/_constants';

import './field.scss';

const Field: FC<{ isRival: boolean }> = ({ isRival }) => {
  const { isAbleShoot, isStarted } = useAppSelector(
    (state) => state.socketSlice,
  );

  return (
    <div style={{ opacity: isAbleShoot ? 1 : 0.5 }} className="battleground">
      {FIELD.map((_, index) => (
        <Cell key={index} coordinate={index} isRival={isRival} />
      ))}
    </div>
  );
};

export default Field;
