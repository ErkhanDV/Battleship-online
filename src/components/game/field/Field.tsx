import { useContext, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '@/context/Context';
import { useAppSelector } from '@/hook/_index';
import { useUserTurn } from '@/hook/AIActions/use-user-turn';

import Cell from '@/components/game/cell/Cell';

import './Field.scss';

import { FIELD } from '@/store/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';

const Field: FC<{ isRival: boolean; isOnline: boolean }> = ({
  isRival,
  isOnline,
}) => {
  const { sendSocket } = useContext(SocketContext);
  const { userTurn } = useUserTurn();
  const { t } = useTranslation();

  const { isAbleShoot, isGameFinded, isStarted, opponentIsReady } =
    useAppSelector((state) => state.gameStateSlice);

  const { rival } = useAppSelector((state) => state.gameShipsSlice);

  const bgClass = `battleground ${!isAbleShoot && isRival ? 'inactive' : ''}`;

  const shootHandler = ({ target }: React.MouseEvent<HTMLDivElement>): void => {
    if (!(target as HTMLDivElement).id) {
      return;
    }

    const shoot = Number((target as HTMLDivElement).id);
    if (isAbleShoot && isStarted && isRival) {
      const isMissAlready = rival.misses.includes(shoot);

      const isDeadAlready = rival.ships.some((ship) => {
        return ship.woundedCells.includes(shoot);
      });

      const isNotAllowed = rival.notAllowed.includes(shoot);

      if (isDeadAlready || isMissAlready || isNotAllowed) {
        return;
      }

      if (isOnline) {
        sendSocket(SOCKETMETHOD.shoot, { shoot: shoot });
      } else {
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
        <div className="connection">{t('fieldWait')}</div>
      )}
      {opponentIsReady && !isStarted && isRival ? (
        <div className="connection">{t('fieldReady')}</div>
      ) : null}
    </div>
  );
};

export default Field;
