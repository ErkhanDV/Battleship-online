import { useEffect, type FC } from 'react';
import { useAppSelector, useSocket, useSocketActions } from '@/hook/_index';
import { gameService } from '@/services/axios/Game';
import './game.scss';
import GameField from '@/components/game/gameField/gameField';
import { useGameStateActions } from '@/hook/use-game-state-actios';

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

  const { changeGameMode } = useGameStateActions();
  changeGameMode(false);

  return (
    <GameField isReady={isReady} socket={socket} readyHandler={readyHandler} />
  );
};

export default Game;
