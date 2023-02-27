import { useContext, FC } from 'react';
import { SocketContext } from '@/context/Context';
import { useAppSelector } from '@/hook/_index';

import Cell from '@/components/game/cell/Cell';
import { FIELD } from '@/store/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';

import './Field.scss';
import Sound from '@/lib/API/Sound/Sound';

import { useUserTurn } from '@/hook/AIActions/use-user-turn';

const Field: FC<{ isRival: boolean; isOnline: boolean }> = ({
  isRival,
  isOnline,
}) => {
  const { sendSocket } = useContext(SocketContext);
  const { userTurn } = useUserTurn();

  const { isAbleShoot, isGameFinded, isStarted } = useAppSelector(
    (state) => state.gameStateSlice,
  );


  const { sound } = useAppSelector((state) => state.appSettingsSlice);


  const bgClass = `battleground ${!isAbleShoot && isRival ? 'inactive' : ''}`;

  const shootHandler = ({ target }: React.MouseEvent<HTMLDivElement>): void => {
    const shoot = Number((target as HTMLDivElement).id);


    if (isAbleShoot && isStarted && isRival) {
    if (sound) Sound('shot');
      if (isOnline && sendSocket) {


        sendSocket(SOCKETMETHOD.shoot, { shoot: shoot });
      } else if ((target as HTMLDivElement).id) {
        userTurn(shoot);
      }
    }
  };

  return (
    <div onClick={shootHandler} className={bgClass}>
      {FIELD.map((_, index) => (
        <Cell key={index} coordinate={index} isRival={isRival} />
      ))}
      {isGameFinded || !isRival ? null : (
        <div className="connection">Waiting for an opponent...</div>
      )}
    </div>
  );
};

export default Field;
