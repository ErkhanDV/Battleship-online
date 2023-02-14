import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/hook/use-redux';
import { SOCKET } from '@/services/axios/_constants';
import {
  IStartGame,
  TSocketMessage,
  IConnectMessage,
  IShootMessage,
  IStartMessage,
} from '@/services/axios/_types';

export const useSocket = () => {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [gameInfo, setGameInfo] = useState<null | IStartGame>(null);
  const [userName, setUserName] = useState('');
  const [opponentName, setOpponentName] = useState('');
  const [isGameFinded, setIsGameFinded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isAbleShoot, setIsAbleShoot] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [winner, setWinner] = useState('');
  const dispatch = useAppDispatch();

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

      const connectHandler = (data: IStartGame & IConnectMessage) => {
        const { isAbleShoot, isGameFinded, field, user } = data;
        if (user.name !== userName) {
          setOpponentName(user.name);
        } else {
          if (field) {
            // присвоить свое поле
          }
          setIsAbleShoot(isAbleShoot);
        }

        setIsGameFinded(isGameFinded);
        console.log('connection');
      };

      const startHandler = (data: IStartGame & IStartMessage) => {
        const { isStarted, field, user } = data;
        setIsStarted(!!isStarted);
        if (user.name !== userName) {
          // присвоить поле оппонента
        }
        console.log('start');
      };

      const shootHandler = (data: IStartGame & IShootMessage) => {
        const { user, coordinates } = data;
        setIsAbleShoot(!(user.name === userName));

        if (user.name === userName) {
        } else {
        }

        console.log('shoot');
      };

      const gameOverHandler = (data: IStartGame & IShootMessage) => {
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

  return {
    init,
    gameInfo,
    socket,
    opponentName,
    isGameFinded,
    isReady,
    setIsReady,
    isStarted,
    isAbleShoot,
    winner,
  };
};
