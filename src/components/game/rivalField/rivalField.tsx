import { type FC } from 'react';
import { useAppSelector } from '@/hook/_index';
import { Field } from '../_index';

const RivalField: FC<{ socket: WebSocket | null }> = ({ socket }) => {
  const { gameInfo, opponentName, isAbleShoot, isGameFinded, isStarted } =
    useAppSelector((state) => state.socketSlice);

  const shootHandler = (e: React.MouseEvent): void => {
    if (e.target instanceof HTMLDivElement) {
      const shoot: number = Number(e.target.id);
      if (isAbleShoot && isStarted) {
        socket?.send(JSON.stringify({ ...gameInfo, shoot, method: 'shoot' }));
      }
    }
  };

  return (
    <div onClick={shootHandler} className="field">
      <h2 className="field_name">{opponentName ? opponentName : 'Unknown'}</h2>
      <Field isRival={true} />
    </div>
  );
};

export default RivalField;
