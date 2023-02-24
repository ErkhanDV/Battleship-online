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
import { Chat } from '@/components/_index';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import { PERSON } from '@/store/_constants';
import { GAMEMODE } from '@/router/_constants';
import './game.scss';

const Game: FC<{ mode: string }> = ({ mode }) => {
  const { sendSocket } = useContext(SocketContext);
  const { t } = useTranslation();
  const { setIsReady, setIsGameFinded, setIsAbleShoot, setIsStarted } =
    useGameStateActions();
  const { setRandomShips } = useGameShipsActions();

  const { userName, isReady, user } = useAppSelector((state) => {
    const { userName } = state.logInSlice;
    const { isReady } = state.gameStateSlice;
    const { user } = state.gameShipsSlice;

    return { userName, isReady, user };
  });

  const [isOnline, setIsOnline] = useState(false);
  const isFilled = user.ships.length < 10;

  useEffect(() => {
    setIsOnline(mode === GAMEMODE.MP ? true : false);
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
            {isOnline ? t(GAMEMODE.ready) : t(GAMEMODE.start)}
          </button>
        ) : null}
        <div className="game_fields">
          <div className="field">
            <h2 className="field_name">{userName}</h2>
            <Field isRival={false} isOnline={isOnline} />
          </div>
          <RivalField isOnline={isOnline} />
          <Gameover />
        </div>
        <ShipStation />
        <Chat />
      </main>
    </div>
  );
};

export default Game;
