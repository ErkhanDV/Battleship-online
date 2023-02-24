import { useContext, useEffect, useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';
import { SocketContext } from '@/context/Context';
import {
  Field,
  RivalField,
  ShipStation,
  Gameover,
} from '@/components/game/_index';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import { PERSON } from '@/store/_constants';
import { Chat } from '@/components/_index';
import './game.scss';

const Game: FC<{ mode: string }> = ({ mode }) => {
  const { sendSocket } = useContext(SocketContext);
  const { t } = useTranslation();
  const { setIsReady, setIsGameFinded, setIsAbleShoot, setIsStarted } =
    useGameStateActions();
  const { setRandomShips } = useGameShipsActions();

  const { userName } = useAppSelector((state) => state.logInSlice);
  const { isReady, winner } = useAppSelector((state) => state.gameStateSlice);
  const { user } = useAppSelector((state) => state.gameShipsSlice);

  const [isOnline, setIsOnline] = useState(false);
  const isFilled = user.ships.length < 10;

  useEffect(() => {
    setIsOnline(mode === 'online' ? true : false);
  }, [mode]);

  useEffect(() => {
    if (!isOnline) {
      setIsGameFinded(true);
    }
  });

  const readyHandler = () => {
    setIsReady(true);
    if (isOnline) {
      sendSocket(SOCKETMETHOD.ready, { field: user });
    } else {
      setIsAbleShoot(true);
      setIsStarted(true);
      setRandomShips(PERSON.rival);
    }
  };

  return (
    <div className="game">
      <main className="main">
        {!isReady ? (
          <button
            disabled={isFilled}
            onClick={readyHandler}
            className="button-render"
          >
            {isOnline ? t('ready') : t('start')}
          </button>
        ) : null}
        <div className="game_fields">
          <div className="field">
            <h2 className="field_name">{userName}</h2>
            <Field isRival={false} isOnline={isOnline} />
          </div>
          <RivalField isOnline={isOnline} />
        </div>
        <ShipStation />
        <Chat />
        <Gameover />
      </main>
    </div>
  );
};

export default Game;
