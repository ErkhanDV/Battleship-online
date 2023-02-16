import { useState, useEffect } from 'react';
import { useAppSelector } from '@/hook/use-redux';
import { SOCKET } from '@/services/axios/_constants';
import {
  IStartGame,
  TSocketMessage,
  IConnect,
  IShoot,
  IStart,
} from '@/store/reducers/types/socket';
import { useSocketActions, useShipLocationActions } from './_index';

export const useSocket = () => {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const {
    setGameInfo,
    setIsAbleShoot,
    setIsGameFinded,
    setIsReady,
    setIsStarted,
    setOpponentName,
    setUserName,
    setWinner,
  } = useSocketActions();
  const { updateShipsLocationState, checkShoot } = useShipLocationActions();
  const { gameInfo, userName } = useAppSelector((state) => state.socketSlice);

  useEffect(() => {
    if (gameInfo && socket && userName) {
      socket.onopen = () => {
        socket.send(JSON.stringify({ ...gameInfo, method: 'connection' }));
      };

      socket.onmessage = (response) => {
        const data: TSocketMessage = JSON.parse(response.data);
        const { method } = data;

        switch (method) {
          case 'connection':
            connectHandler(data);
            break;

          case 'start':
            startHandler(data);
            break;

          case 'shoot':
            shootHandler(data);
            break;

          case 'gameOver':
            gameOverHandler(data);
            break;

          case 'exit':
            socket.close();
        }
      };

      const connectHandler = (data: IStartGame & IConnect) => {
        const {
          isAbleShoot,
          isGameFinded,
          field,
          user,
          opponentName,
          opponentField,
        } = data;

        if (user.name !== userName) {
          setOpponentName(user.name);
        } else {
          if (field) {
            setIsReady(true);
            updateShipsLocationState(field, 'user');
          }

          if (opponentName) {
            setOpponentName(opponentName);
          }

          if (opponentField) {
            updateShipsLocationState(opponentField, 'opponent');
          }
          setIsAbleShoot(isAbleShoot);
        }

        setIsGameFinded(isGameFinded);
        console.log('connection');
      };

      const startHandler = (data: IStartGame & IStart) => {
        console.log('start');
        const { isStarted, field, user } = data;
        setIsStarted(!!isStarted);
        if (user.name !== userName) {
          updateShipsLocationState(field, 'opponent');
        }
      };

      const shootHandler = (data: IStartGame & IShoot) => {
        const { user, coordinates } = data;
        setIsAbleShoot(user.name !== userName);

        if (user.name === userName) {
          checkShoot('user', coordinates.target);
        } else {
          checkShoot('rival', coordinates.target);
        }
        console.log('shoot');
      };

      const gameOverHandler = (data: IStartGame & IShoot) => {
        const { user, coordinates } = data;
        //set store coordinates возвращают место куда встрелил соперник, над озакидывать в стор
        setWinner(user.name);
        console.log('gameover');
      };
    }
  }, [gameInfo, socket, userName]);

  const init = (response: IStartGame) => {
    setSocket(new WebSocket(SOCKET));
    setGameInfo(response);
    setUserName(response.user.name);
  };

  return { init, socket };
};
