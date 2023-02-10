import { useState } from 'react';
import { SOCKET } from '@/services/axios/_constants';
import { IStartGame, ISocketMessage } from '@/services/axios/_types';
import { IShipsLocation } from '@/store/_types';

export const useSocket = () => {
  let socket: WebSocket;
  let gameInfo: IStartGame;
  const [userName, setUserName] = useState('');
  const [opponentName, setOpponentName] = useState('');
  const [isGameFinded, setIsGameFinded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isAbleShoot, setIsAbleShoot] = useState(false);
  const [winner, setWinner] = useState('');

  const init = (response: IStartGame) => {
    gameInfo = response;
    socket = new WebSocket(SOCKET);

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
  };

  const connectHandler = (data: ISocketMessage) => {
    const { user, isAbleShoot, isGameFinded } = data;

    if (user.name !== userName) {
      setOpponentName(user.name);
    } else {
      setIsAbleShoot(isAbleShoot);
    }

    setIsGameFinded(isGameFinded);
    console.log('connection');
  };

  const startHandler = (data: ISocketMessage) => {
    if (data.isStarted) {
      setIsStarted(true);
    }
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

  const setReady = (field: IShipsLocation) => {
    socket.send(JSON.stringify({ ...gameInfo, field, method: 'ready' }));
  };

  const setShoot = (coordinates: number) => {
    if (isAbleShoot) {
      socket.send(JSON.stringify({ ...gameInfo, coordinates, method: 'shoot' }));
    }
  };

  const exitSocket = () => {
    socket.send(JSON.stringify({ ...gameInfo, method: 'exit' }));
  };

  return { init, opponentName, isGameFinded, isStarted, isAbleShoot, winner, setReady, setShoot, exitSocket };
};
