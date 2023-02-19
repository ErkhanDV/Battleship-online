import { useContext, type FC } from 'react';
import {
  useAppSelector,
  useShipLocationActions,
  useSocketActions,
} from '@/hook/_index';
import { SocketContext } from '@/Context';
import { Field, RivalField, ShipStation } from '@/components/game/_index';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import './game.scss';
import { PERSON } from '@/store/_constants';

const Game: FC<{ mode: string }> = ({ mode }) => {
  const isOnline = mode === 'online';
  const { sendSocket } = useContext(SocketContext);

  const { setIsReady } = useSocketActions();
  const { setRandomShips } = useShipLocationActions();

  const userName = useAppSelector((state) => state.logInSlice.user);
  const { isReady } = useAppSelector((state) => state.socketSlice);
  const { shipsLocationSlice } = useAppSelector((state) => state);
  const { user } = shipsLocationSlice;
  const isFilled = user.shipsLocation.length < 10;

  const readyHandler = () => {
    setIsReady(true);
    if (isOnline) {
      sendSocket(SOCKETMETHOD.ready, { field: user });
    } else {
      setRandomShips(PERSON.rival);
    }
  };

  const exitHandler = () => {
    sendSocket(SOCKETMETHOD.exit);
  };

  return (
    <div className="game">
      <main className="game-wrapper">
        {!isReady ? (
          <button disabled={isFilled} onClick={readyHandler} className="ready">
            {isOnline ? 'Ready' : 'Start game'}
          </button>
        ) : null}
        <div className="fields">
          <div className="user">
            <div className="name">{userName}</div>
            <Field isRival={false} />
          </div>
          <RivalField isOnline={isOnline} />
        </div>
        <ShipStation />
      </main>
    </div>
  );
};

export default Game;
