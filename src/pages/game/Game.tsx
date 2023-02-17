import { useContext, useEffect, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import {
  useAppSelector,
  useSocketActions,
  useShipLocationActions,
} from '@/hook/_index';
import { SocketContext } from '@/Context';
import { gameService } from '@/services/axios/Game';
import { Field, RivalField, ShipStation } from '@/components/game/_index';
import { getSettedShips } from '@/lib/utils/getSettedShips';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import './game.scss';

const Game: FC = () => {
  const location = useLocation();
  const { socket, init } = useContext(SocketContext);
  const { setIsReady } = useSocketActions();
  const { updateShipsLocationState } = useShipLocationActions();

  const { gameInfo, isReady } = useAppSelector((state) => state.socketSlice);
  const { shipsLocation } = useAppSelector(
    (state) => state.shipsLocationSlice.user,
  );
  const { user } = useAppSelector((state) => state.shipsLocationSlice);

  useEffect(() => {
    (async () => {
      const response = await gameService.startGame();

      if (response) {
        init(response);
      }
    })();
  }, []);

  const ships = getSettedShips(shipsLocation);

  const readyHandler = () => {
    console.log(user);
    setIsReady(true);
    socket?.send(
      JSON.stringify({
        ...gameInfo,
        field: user,
        method: SOCKETMETHOD.ready,
      }),
    );
  };

  const exitHandler = () => {
    socket?.send(JSON.stringify({ ...gameInfo, method: SOCKETMETHOD.exit }));
  };

  const renderButton = () => {
    if (!isReady) {
      return (
        <button
          disabled={user.shipsLocation.length < 10}
          onClick={readyHandler}
          className="ready"
        >
          Ready
        </button>
      );
    }
  };

  return (
    <div className="game">
      <main className="game-wrapper">
        {renderButton()}
        <div className="fields">
          <div className="user">
            <div className="name">You</div>
            <Field isRival={false} />
          </div>
          <RivalField socket={socket} />
        </div>
        <ShipStation ships={ships} />
      </main>
    </div>
  );
};

export default Game;
