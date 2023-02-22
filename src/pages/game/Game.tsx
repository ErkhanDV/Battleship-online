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
import { GAMEDIFFICULTS, PERSON } from '@/store/_constants';
import { computerTurn } from '@/lib/API/AI/ai';

import { SOCKETMETHOD } from '@/services/axios/_constants';
import { Chat } from '@/components/_index';

const Game: FC<{ mode: string }> = ({ mode }) => {
  const isOnline = mode === 'online';

  useEffect(() => {
    if (!isOnline) {
      setIsGameFinded(true);
    }
  });

  const {
    setIsReady,
    setIsGameFinded,
    setIsAbleShoot,
    setIsStarted,
    setGameDifficult,
  } = useGameStateActions();
  const { setRandomShips, checkShoot, addNotAllowed } = useGameShipsActions();

  const { sendSocket } = useContext(SocketContext);

  const { t } = useTranslation();

  const userName = useAppSelector((state) => state.logInSlice.user);
  const { isReady, winner, gameDifficult } = useAppSelector(
    (state) => state.gameStateSlice,
  );

  const { gameShipsSlice } = useAppSelector((state) => state);
  const { user } = gameShipsSlice;
  const isFilled = user.ships.length < 10;

  const readyHandler = () => {
    setIsReady(true);
    if (isOnline && sendSocket) {
      sendSocket(SOCKETMETHOD.ready, { field: user });
    } else {
      setIsStarted(true);
      setRandomShips(PERSON.rival);
      if (gameDifficult && gameDifficult > 1) {
        computerTurn(
          checkShoot,
          setIsAbleShoot,
          user,
          gameDifficult,
          addNotAllowed,
        );
      } else {
        setIsAbleShoot(true);
      }
    }
  };

  const gameDifficultHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGameDifficult(Number(e.target.value));
  };

  const exitHandler = () => {
    sendSocket(SOCKETMETHOD.exit);
  };

  return (
    <div className="game">
      <main className="main">
        <div className="game_difficult">
          <select
            name="difficult"
            id="difficult"
            onChange={(e) => gameDifficultHandler(e)}
          >
            {GAMEDIFFICULTS.map((difficult, i) => (
              <option value={i} key={i}>
                {difficult}
              </option>
            ))}
          </select>
        </div>
        {!isReady ? (
          <button
            disabled={isFilled || !gameDifficult}
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
        <Gameover />
      </main>
      <Chat />
    </div>
  );
};

export default Game;
