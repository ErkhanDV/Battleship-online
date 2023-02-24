import { FC } from 'react';

import { useAppSelector } from '@/hook/_index';
import Cell from '@/components/game/cell/Cell';
import { useTranslation } from 'react-i18next';

import './Field.scss';

import { FIELD } from '@/store/_constants';

const Field: FC<{ isRival: boolean }> = ({ isRival }) => {
  const { isAbleShoot, isGameFinded } = useAppSelector(
    (state) => state.gameStateSlice,
  );

  const { t } = useTranslation();

  return (
    <div
      style={{ opacity: !isAbleShoot && isRival ? 0.5 : 1 }}
      className="battleground"
    >
      {FIELD.map((_, index) => (
        <Cell key={index} coordinate={index} isRival={isRival} />
      ))}
      {isGameFinded || !isRival ? null : (
        <div className="connection">{t('waiting')}</div>
      )}
    </div>
  );
};

export default Field;
