import { useState, useRef } from 'react';
import { SOCKET } from '@/services/axios/_constants';
import { IStartGame, ISocketMessage } from '@/services/axios/_types';
import { ShipCoordinates } from '@/store/_types';

export const useSocket = () => {
  const socket = useRef<null | WebSocket>(null);
  const gameInfo = useRef<null | IStartGame>(null);
  const [userName, setUserName] = useState('');
  const [opponentName, setOpponentName] = useState('');
  const [isGameFinded, setIsGameFinded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isAbleShoot, setIsAbleShoot] = useState(true);
  const [winner, setWinner] = useState('');

  const init = (response: IStartGame) => {
    gameInfo.current = response;
    socket.current = new WebSocket(SOCKET);
    setUserName(response.user.name);
    console.log(userName);
    // console.log(userName);

    socket.current.onopen = () => {
      socket.current?.send(
        JSON.stringify({ ...gameInfo.current, method: 'connection' }),
      );
    };

    socket.current.onmessage = (response) => {
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
          socket.current?.close();
      }
    };

    const connectHandler = (data: ISocketMessage) => {
      if (data.user.name !== userName) {
        setOpponentName(data.user.name);
      } else {
        setIsAbleShoot(data.isAbleShoot);
        console.log(userName);
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
  };

  const setReady = (field: ShipCoordinates[]) => {
    socket.current?.send(
      JSON.stringify({ ...gameInfo.current, field, method: 'ready' }),
    );
  };

  const setShoot = (coordinates: number) => {
    console.log(isAbleShoot, gameInfo.current, coordinates);
    if (isAbleShoot) {
      socket.current?.send(
        JSON.stringify({ ...gameInfo.current, coordinates, method: 'shoot' }),
      );
    }
  };

  const exitSocket = () => {
    socket.current?.send(
      JSON.stringify({ ...gameInfo.current, method: 'exit' }),
    );
  };

  return {
    init,
    opponentName,
    isGameFinded,
    isStarted,
    isAbleShoot,
    winner,
    setReady,
    setShoot,
    exitSocket,
  };
};
