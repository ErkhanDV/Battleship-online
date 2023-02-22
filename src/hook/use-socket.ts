import { useEffect, useState } from 'react';
import { useAppSelector, useGameStateActions } from './_index';
import { useSocketHandlers } from './socketHandlers/_index';
import { SOCKET, SOCKETMETHOD } from '@/services/axios/_constants';
import { IStartGame, TSocketMessage } from '@/store/reducers/types/socket';
import { TSendData, ISendConnect } from '@/store/reducers/types/socket';

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

  const { setGameInfo } = useGameStateActions();

  const { gameInfo, userName } = useAppSelector(
    (state) => state.gameStateSlice,
  );

  useEffect(() => {
    if (userName && socket && gameInfo) {
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
  }, [userName, socket, gameInfo]);

  const sendSocket = <T extends TSendData>(method: string, data?: T) => {
    if (method === SOCKETMETHOD.connect) {
      setGameInfo(data ? (data as ISendConnect) : null);
    }

    socket.send(
      JSON.stringify({
        ...data,
        method: method,
      }),
    );
  };

  return { socket, sendSocket };
};
