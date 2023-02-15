import { useState, useEffect, type FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/use-redux';
import { useSocket } from '@/hook/use-socket';
import { gameService } from '@/services/axios/Game';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Field from '@/components/game/battleground/Field';
import Ship from '@/components/game/ship/ship';
import './game.scss';
import { getSettedShips } from '@/lib/helpers/getSettedShips';

const Game: FC = () => {
  const {
    init,
    gameInfo,
    opponentName,
    socket,
    isAbleShoot,
    isStarted,
    isGameFinded,
    isReady,
    setIsReady,
  } = useSocket();

  useEffect(() => {
    (async () => {
      const response = await gameService.startGame();

      if (response) {
        init(response);
      }
    })();
  }, []);

  const initialShipsSet = useAppSelector(
    (state) => state.shipsLocationSlice.user.shipsLocation,
    () => true,
  );
  const ships: number[] = getSettedShips(initialShipsSet);
  const field = useAppSelector((state) => state.shipsLocationSlice.user);
  const field1 = useAppSelector((state) => state.shipsLocationSlice.rival);
  console.log(field1);

  const readyHandler = () => {
    setIsReady(true);
    socket?.send(
      JSON.stringify({
        ...gameInfo,
        field,
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
          disabled={field.shipsLocation.length < 10}
          onClick={readyHandler}
          className="ready"
        >
          Ready
        </button>
      );
    }
  };

  const renderStation = () => {
    if (!isReady) {
      return (
        <div className="ship-station">
          {ships.map((decks, i) => (
            <Ship decks={decks} key={i} />
          ))}
          <button>Random</button>
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
        {renderStation()}
      </main>
      <Footer />
    </div>
  );
};

export default Game;
