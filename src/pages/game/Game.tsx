import { useContext, type FC } from 'react';
import { useAppSelector, useSocketActions } from '@/hook/_index';
import { SocketContext } from '@/Context';
import { Field, RivalField, ShipStation } from '@/components/game/_index';
import { getSettedShips } from '@/lib/utils/getSettedShips';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import './game.scss';
import GameField from '@/components/game/gameField/GameField';
import { useGameStateActions } from '@/hook/use-game-state-actios';

const Game: FC = () => {
  const { socket, init } = useContext(SocketContext);
  const { setIsReady } = useSocketActions();

  const { gameInfo, isReady } = useAppSelector((state) => state.socketSlice);
  const { user } = useAppSelector((state) => state.shipsLocationSlice);

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

  const { changeGameMode } = useGameStateActions();
  changeGameMode(false);

  return (
    <GameField isReady={isReady} socket={socket} readyHandler={readyHandler} />
  );
};

export default Game;
