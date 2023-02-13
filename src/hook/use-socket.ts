import { useState, useEffect } from 'react';
import { SOCKET } from '@/services/axios/_constants';
import { IStartGame, ISocketMessage } from '@/services/axios/_types';
import { ShipCoordinates } from '@/store/_types';

export const useSocket = () => {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [gameInfo, setGameInfo] = useState<null | IStartGame>(null);
  const [userName, setUserName] = useState('');
  const [opponentName, setOpponentName] = useState('');
  const [isGameFinded, setIsGameFinded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isAbleShoot, setIsAbleShoot] = useState(true);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    if (gameInfo && socket && userName) {
      socket.onopen = () => {
        socket.send(JSON.stringify({ ...gameInfo, method: 'connection' }));
      };

      socket.onmessage = (response) => {
        const data: ISocketMessage = JSON.parse(response.data);
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

      const connectHandler = (data: ISocketMessage) => {
        if (data.user.name !== userName) {
          setOpponentName(data.user.name);
        } else {
          setIsAbleShoot(data.isAbleShoot);
        }

        setIsGameFinded(data.isGameFinded);
        console.log('connection');
      };

      const startHandler = (data: ISocketMessage) => {
        if (data.isStarted) {
          setIsStarted(true);
        }
        console.log('start');
      };

      const shootHandler = (data: ISocketMessage) => {
        const { user, coordinates } = data;
        if (user.name === userName) {
          setIsAbleShoot(false);
        } else {
          setIsAbleShoot(true);
          //set store coordinates возвращают место куда встрелил соперник, над озакидывать в стор
        }
        console.log('shoot');
      };

      const gameOverHandler = (data: ISocketMessage) => {
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

  // const setReady = (field: ShipCoordinates[]) => {
  //   socket?.send(JSON.stringify({ ...gameInfo, field, method: 'ready' }));
  // };

  // const setShoot = (coordinates: number) => {
  //   if (isAbleShoot) {
  //     socket?.send(
  //       JSON.stringify({ ...gameInfo, coordinates, method: 'shoot' }),
  //     );
  //   }
  // };

  // const exitSocket = () => {
  //   socket?.send(JSON.stringify({ ...gameInfo, method: 'exit' }));
  // };

  return {
    init,
    gameInfo,
    socket,
    opponentName,
    isGameFinded,
    isStarted,
    isAbleShoot,
    winner,
    // setReady,
    // setShoot,
    // exitSocket,
  };
};
