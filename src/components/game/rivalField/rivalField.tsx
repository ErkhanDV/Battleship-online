import { useContext, type FC } from 'react';
import { useAppSelector } from '@/hook/_index';
import { Field } from '../_index';
import { SocketContext } from '@/Context';

const RivalField: FC<{ isOnline: boolean }> = ({ isOnline }) => {
  const { sendSocket } = useContext(SocketContext);
  const { opponentName, isAbleShoot, isStarted } = useAppSelector(
    (state) => state.gameStateSlice,
  );

  return (
    <div className="field">
      <h2 className="field_name">{isOnline ? opponentName : 'Computer'}</h2>
      <Field isRival={true} isOnline={isOnline} />
    </div>
  );
};

export default RivalField;
