import { useEffect, type FC } from 'react';
import { useAppSelector, useSocket, useSocketActions } from '@/hook/_index';
import { gameService } from '@/services/axios/Game';
import { Header, Footer } from '@/components/_index';
import { Field, RivalField, ShipStation } from '@/components/game/_index';
import { getSettedShips } from '@/lib/utils/getSettedShips';
import './game.scss';

const Game: FC = () => {
  const { init, socket } = useSocket();
  const { setIsReady } = useSocketActions();
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
    setIsReady(true);
    socket?.send(
      JSON.stringify({
        ...gameInfo,
        field: user,
        method: 'ready',
      }),
    );
  };

  const exitHandler = () => {
    socket?.send(JSON.stringify({ ...gameInfo, method: 'exit' }));
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
      <Header />
      <main className="game-wrapper">
        {renderButton()}
        <div className="fields">
          <div className="user">
            <Field />
          </div>
          <RivalField socket={socket} />
        </div>
        <ShipStation ships={ships} />
      </main>
      <Footer />
    </div>
  );
};

export default Game;
