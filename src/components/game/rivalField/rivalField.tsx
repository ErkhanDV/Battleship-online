import { type FC } from 'react';
import { useAppSelector } from '@/hook/_index';
import { Field } from '../_index';

const RivalField: FC<{ isOnline: boolean }> = ({ isOnline }) => {
  const { opponentName } = useAppSelector((state) => state.gameStateSlice);

  return (
    <div className="field">
      <h2 className="field_name">{isOnline ? opponentName : 'Computer'}</h2>
      <Field isRival={true} isOnline={isOnline} />
    </div>
  );
};

export default RivalField;
