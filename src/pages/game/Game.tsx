import { useState, useEffect, type FC, useMemo } from 'react';
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
  addMiss,
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

  const dispatch = useAppDispatch();

  useMemo(() => {
    dispatch(
      updateShipsLocationState({
        user: {
          shipsLocation: [
            // {
            //   decks: 4,
            //   occupiedCells: [
            //     12, 62, 21, 31, 41, 51, 11, 61, 23, 33, 43, 53, 13, 63,
            //   ],
            //   shipLocation: [22, 32, 42, 52],
            //   woundedCells: [22, 52],
            // },
            // {
            //   decks: 3,
            //   occupiedCells: [17, 18, 19, 27, 29, 37, 39, 47, 49, 57, 58, 59],
            //   shipLocation: [28, 38, 48],
            //   woundedCells: [28],
            // },
            // {
            //   decks: 3,
            //   occupiedCells: [44, 45, 46, 84, 85, 86, 54, 64, 74, 56, 66, 76],
            //   shipLocation: [55, 65, 75],
            //   woundedCells: [65],
            // },
          ],
          misses: [],
        },
        rival: { shipsLocation: [], misses: [] },
      }),
    );
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
          disabled={settedShips.length < 10}
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
