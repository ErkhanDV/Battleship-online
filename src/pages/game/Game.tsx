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
import {
  addShip,
  updateShipsLocationState,
} from '@/store/reducers/shipsLocationSlice';

const Game = () => {
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

  const settedShips = useAppSelector(
    (state) => state.shipsLocationSlice.user.shipsLocation,
  );

  const readyHandler = () => {
    setIsReady(true);
    socket?.send(JSON.stringify({ ...gameInfo, settedShips, method: 'ready' }));
    // socket.current?.setReady(settedShips);
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

  const initialShipsSet = useAppSelector(
    (state) => state.shipsLocationSlice.user.shipsLocation,
    () => true,
  );
  const ships: number[] = getSettedShips(initialShipsSet);

  return (
    <div className="game">
      <Header />

      <main className="game-wrapper">
        <button
          style={{ visibility: isReady ? 'hidden' : 'visible' }}
          disabled={settedShips.flat().length < 20}
          onClick={readyHandler}
          className="ready"
        >
          Ready
        </button>
        <div className="fields">
          <div className="user">
            <Field />
          </div>
          {renderRivalField()}
        </div>

        <div className="ship-station">
          {ships.map((decks, i) => (
            <Ship decks={decks} key={i} />
          ))}
          <button>Random</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Game;
