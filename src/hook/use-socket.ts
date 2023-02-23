import { useCallback, useEffect, useRef } from 'react';
import { useGameStateActions } from './_index';
import { useSocketHandlers } from './socketHandlers/_index';
import { SOCKET, SOCKETMETHOD } from '@/services/axios/_constants';
import { TSocketMessage } from '@/store/reducers/types/socket';
import { TSendData, ISendConnect } from '@/store/reducers/types/socket';

export const useSocket = () => {
  const socket = useRef<WebSocket>();
  const {
    connectHandler,
    shootHandler,
    gameoverHandler,
    readyHandler,
    exitHandler,
    chatHandler,
  } = useSocketHandlers();

  const { setGameInfo } = useGameStateActions();

  useEffect(() => {
    socket.current = new WebSocket(SOCKET);

    socket.current.onmessage = (response) => {
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
  }, []);

  window.onunload = () => {
    socket.current?.close();
  };

  const sendSocket = useCallback(
    <T extends TSendData>(method: string, data?: T) => {
      if (method === SOCKETMETHOD.connect) {
        setGameInfo(data ? (data as ISendConnect) : null);
      }

      socket.current?.send(
        JSON.stringify({
          ...data,
          method: method,
        }),
      );
    },
    [socket],
  );

  return { sendSocket };
};
