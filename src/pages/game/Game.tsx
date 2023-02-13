import { useState, useEffect, type FC } from 'react';
import { gameService } from '@/services/axios/Game';
import { useAppSelector } from '@/store/hook/hook';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Background from '@/components/background/Background';
import Field from '@/components/game/battleground/Field';
import Ship from '@/components/game/ship/ship';
import { SHIPS } from '@/store/_constants';
import { useSocket } from '@/hook/use-socket';

import './game.scss';

const Game = () => {
  const { init, gameInfo, opponentName, socket, isAbleShoot, isGameFinded } =
    useSocket();

  useEffect(() => {
    (async () => {
      const response = await gameService.startGame();

      if (response) {
        init(response);
      }
    })();
  }, []);

  const settedShips = useAppSelector((state) => state.shipsSlice.shipsLocation);

  const readyHandler = () => {
    socket?.send(JSON.stringify({ ...gameInfo, settedShips, method: 'ready' }));
    // socket.current?.setReady(settedShips);
  };

  const shootHandler = (e: React.MouseEvent): void => {
    if (e.target instanceof HTMLDivElement) {
      const shoot: number = Number(e.target.id);
      if (isAbleShoot) {
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
          <Field isAbleShoot={isAbleShoot} isRival={true} />
        </div>
      );
    } else {
      return <div>Waiting for opponent...</div>;
    }
  };

  return (
    <div className="game">
      <Header />

      <main className="game-wrapper">
        <button
          disabled={settedShips.flat().length < 20}
          onClick={readyHandler}
          className="ready"
        >
          Ready
        </button>
        <div className="fields">
          <div className="user">
            <Field isAbleShoot={true} />
          </div>
          {renderRivalField()}
        </div>

        <div className="ship-station">
          {SHIPS.map((decks, i) => (
            <Ship decks={decks} key={i} />
          ))}
        </div>
      </main>
      <Footer />
      <Background />
    </div>
  );
};

export default Game;
