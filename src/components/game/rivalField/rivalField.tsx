import { type FC } from 'react';
import { useAppSelector } from '@/hook/_index';
import { Field } from '../_index';

const RivalField: FC<{ socket?: WebSocket | null }> = ({ socket }) => {
  const { gameInfo, opponentName, isAbleShoot, isGameFinded, isStarted } =
    useAppSelector((state) => state.socketSlice);

  const { singlePlayer, isStartSingle } = useAppSelector(
    (state) => state.gameStateSlice,
  );

  const shootHandler = (e: React.MouseEvent): void => {
    if (e.target instanceof HTMLDivElement) {
      const shoot: number = Number(e.target.id);
      if (isAbleShoot && isStarted) {
        socket?.send(JSON.stringify({ ...gameInfo, shoot, method: 'shoot' }));
      } else if (!!isStartSingle) {
        console.log(e.target.id);
      }
    }
  };

  const opponentTitle = opponentName
    ? opponentName
    : !!singlePlayer
    ? 'Computer'
    : 'Unknown';

  return (
    <div onClick={shootHandler} className="opponent">
      <div className="opponent-name">{opponentTitle}</div>
      <Field isRival={true} />
    </div>
  );
};

export default RivalField;
