import { useEffect, useState } from 'react';
import { useAppSelector, useGameStateActions } from './_index';
import { useSocketHandlers } from './socketHandlers/_index';
import { SOCKET, SOCKETMETHOD } from '@/services/axios/_constants';
import { IStartGame, TSocketMessage } from '@/store/reducers/types/socket';
import { TSendData } from '@/store/reducers/types/socket';

export const useSocket = () => {
  const [socket, setSocket] = useState(new WebSocket(SOCKET));
  const {
    connectHandler,
    shootHandler,
    gameoverHandler,
    readyHandler,
    exitHandler,
    chatHandler,
  } = useSocketHandlers();

  const { gameInfo, userName } = useAppSelector(
    (state) => state.gameStateSlice,
  );

  useEffect(() => {
    if (gameInfo && userName) {
      // socket.onopen = () => {
      //   socket.send(
      //     JSON.stringify({ ...gameInfo, method: SOCKETMETHOD.connect }),
      //   );
      // };

      // socket.onclose = () => {
      //   setWinner('Противник вышел из боя');
      //   setTimeout(() => {
      //     navigate(ROUTE.home);
      //     setWinner('');
      //   }, 3000);
      // };

      socket.onmessage = (response) => {
        const data: TSocketMessage = JSON.parse(response.data);
        const { method } = data;
        const { shoot, connect, ready, gameover, exit, chat } = SOCKETMETHOD;

        switch (method) {
          case connect:
            connectHandler(data);
            break;

          case ready:
            readyHandler(data);
            break;

          case shoot:
            shootHandler(data);
            break;

          case gameover:
            gameoverHandler(data);
            break;

          case chat:
            chatHandler(data);
            break;

          case exit:
            exitHandler();
            break;
        }
      };
    }
  }, [gameInfo, userName]);

  const sendSocket = (method: string, data?: TSendData) => {
    socket.send(
      JSON.stringify({
        ...data,
        method: method,
      }),
    );
  };

  return { socket, sendSocket };
};
