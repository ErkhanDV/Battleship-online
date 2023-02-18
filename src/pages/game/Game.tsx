import { useEffect, type FC } from 'react';
<<<<<<< HEAD
import { useAppSelector, useSocket, useSocketActions } from '@/hook/_index';
import { gameService } from '@/services/axios/Game';
import './game.scss';
import GameField from '@/components/game/gameField/gameField';
import { useGameStateActions } from '@/hook/use-game-state-actios';
=======
import { useLocation } from 'react-router-dom';

import {
  useAppSelector,
  useSocket,
  useSocketActions,
  useShipLocationActions,
} from '@/hook/_index';
import { gameService } from '@/services/axios/Game';
import { Field, RivalField, ShipStation } from '@/components/game/_index';

import './Game.scss';

import { getSettedShips } from '@/lib/utils/getSettedShips';
>>>>>>> develop

const Game: FC = () => {
  const { init, socket } = useSocket();
  const { setIsReady } = useSocketActions();

  const { gameInfo, isReady } = useAppSelector((state) => state.socketSlice);
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

  const exitHandler = () => {
    socket?.send(JSON.stringify({ ...gameInfo, method: 'exit' }));
  };

<<<<<<< HEAD
  const { changeGameMode } = useGameStateActions();
  changeGameMode(false);

  return (
    <GameField isReady={isReady} socket={socket} readyHandler={readyHandler} />
=======
  const renderButton = () => {
    if (!isReady) {
      return (
        <button
          disabled={user.shipsLocation.length < 10}
          onClick={readyHandler}
          className="button-render"
        >
          {user.shipsLocation.length < 10 ? 'Arrange your ships' : 'Ready'}
        </button>
      );
    }
  };

  return (
    <div className="game">
      <main className="main">
        {renderButton()}
        <div className="game_fields">
          <div className="field">
            <h2 className="field_name">User Name</h2>
            <Field isRival={false} />
          </div>
          <RivalField socket={socket} />
        </div>
        <ShipStation ships={ships} />
      </main>
    </div>
>>>>>>> develop
  );
};

export default Game;
