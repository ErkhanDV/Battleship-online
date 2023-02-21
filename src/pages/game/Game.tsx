import { useContext, useEffect, type FC } from 'react';
import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';

import { useTranslation } from 'react-i18next';

import { SocketContext } from '@/context/Context';
import {
  Field,
  RivalField,
  ShipStation,
  Gameover,
} from '@/components/game/_index';

import './game.scss';

import { SOCKETMETHOD } from '@/services/axios/_constants';
import { PERSON } from '@/store/_constants';

const Game: FC<{ mode: string }> = ({ mode }) => {
  const isOnline = mode === 'online';

  useEffect(() => {
    if (!isOnline) {
      setIsGameFinded(true);
    }
  });

  const { socket, sendSocket, init } = useContext(SocketContext);
  const { setIsReady, setIsGameFinded, setIsAbleShoot, setIsStarted } =
    useGameStateActions();
  const { isReady, winner } = useAppSelector((state) => state.gameStateSlice);

  const { setRandomShips } = useGameShipsActions();

  const { t } = useTranslation();

  const userName = useAppSelector((state) => state.logInSlice.user);

  const { gameShipsSlice } = useAppSelector((state) => state);
  const { user } = gameShipsSlice;
  const isFilled = user.ships.length < 10;

  const readyHandler = () => {
    setIsReady(true);
    if (isOnline && sendSocket) {
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
        <Gameover />
        {!isReady ? (
          <button
            disabled={isFilled}
            onClick={readyHandler}
            className="button-render"
          >
            {isOnline ? 'Ready' : 'Start game'}
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
      </main>
    </div>
  );
};

export default Game;
