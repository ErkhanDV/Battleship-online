import { useContext, useEffect, type FC } from 'react';
import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';
import { SocketContext } from '@/Context';
import {
  Field,
  RivalField,
  ShipStation,
  Gameover,
} from '@/components/game/_index';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import './game.scss';
import { GAMEDIFFICULTS, PERSON } from '@/store/_constants';

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
  const { setRandomShips } = useGameShipsActions();
  const { setGameDifficult } = useGameStateActions();

  const userName = useAppSelector((state) => state.logInSlice.user);
  const { user } = useAppSelector((state) => state.gameShipsSlice);
  const { isReady, winner } = useAppSelector((state) => state.gameStateSlice);
  const isFilled = user.shipsLocation.length < 10;

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

  const gameDifficultHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGameDifficult(Number(e.target.value));
  };

  const exitHandler = () => {
    sendSocket(SOCKETMETHOD.exit);
  };

  return (
    <div className="game">
      <main className="main">
        <Gameover />
        {!isOnline && !isReady ? (
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
        ) : null}
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
