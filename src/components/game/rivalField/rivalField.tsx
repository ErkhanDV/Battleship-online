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

  if (isGameFinded) {
    return (
      <div onClick={shootHandler} className="opponent">
        <div className="opponent-name">{opponentName}</div>
        <Field isRival={true} />
      </div>
    );
  } else {
    return <div>Waiting for opponent...</div>;
  }
};

export default RivalField;
