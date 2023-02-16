import { useEffect, type FC } from 'react';
import {
  useAppSelector,
  useShipLocationActions,
  useSocket,
  useSocketActions,
} from '@/hook/_index';
import { gameService } from '@/services/axios/Game';
import { Header, Footer } from '@/components/_index';
import { Field, Ship } from '@/components/game/_index';
import { getSettedShips } from '@/lib/utils/getSettedShips';
import { getCorrectShip } from '@/lib/API/ShipsPlacer/ShipsPlacer';
import { IShip } from '@/store/reducers/types/shipLocation';
import './game.scss';

const Game: FC = () => {
  const { init, socket } = useSocket();
  const { setIsReady } = useSocketActions();
  const { addShip } = useShipLocationActions();
  const {
    gameInfo,
    opponentName,
    isAbleShoot,
    isGameFinded,
    isReady,
    isStarted,
  } = useAppSelector((state) => state.socketSlice);
  const { user } = useAppSelector((state) => state.shipsLocationSlice);

  useEffect(() => {
    (async () => {
      const response = await gameService.startGame();

      if (response) {
        init(response);
      }
    })();
  }, []);

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

  const shootHandler = (e: React.MouseEvent): void => {
    if (e.target instanceof HTMLDivElement) {
      const shoot: number = Number(e.target.id);
      if (isAbleShoot && isStarted) {
        socket?.send(JSON.stringify({ ...gameInfo, shoot, method: 'shoot' }));
      }
    }
  };

  const exitSocket = () => {
    socket?.send(JSON.stringify({ ...gameInfo, method: 'exit' }));
  };

  const renderRivalField = () => {
    if (isGameFinded) {
      return (
        <div onClick={shootHandler} className="opponent">
          <div className="opponent-name">{opponentName}</div>
          <Field
            isAbleShoot={isAbleShoot}
            isStarted={isStarted}
            isRival={true}
          />
        </div>
      );
    } else {
      return <div>Waiting for opponent...</div>;
    }
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

  const shipsSet = useAppSelector(
    (state) => state.shipsLocationSlice.user.shipsLocation,
  );
  const ships = getSettedShips(shipsSet);

  const getRandomShipSet = () => {
    const settedShips = [...shipsSet];
    const newShips: IShip[] = [];
    ships.forEach((ship) => {
      getCorrectShip(settedShips, newShips, ship);
    });
    newShips.forEach((ship) => addShip(ship));
  };

  const renderStation = (ships: number[]) => {
    if (!isReady) {
      return (
        <div className="ship-station">
          {ships.map((decks, i) => (
            <Ship decks={decks} key={i} />
          ))}
          <button onClick={getRandomShipSet}>Random</button>
        </div>
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
          {renderRivalField()}
        </div>
        {renderStation(ships)}
      </main>
      <Footer />
    </div>
  );
};

export default Game;
