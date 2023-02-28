import { useCallback, useEffect, useRef } from 'react';
import { useAppSelector, useGameStateActions } from './_index';
import { useSocketHandlers } from './socketHandlers/_index';
import { SOCKET, SOCKETMETHOD } from '@/services/axios/_constants';
import { TSocketMessage } from '@/store/reducers/types/socket';
import { ISendConnect, TSendSocket } from '@/store/reducers/types/socket';

export const useSocket = () => {
  const socket = useRef<WebSocket>();
  const {
    connectHandler,
    disconnectHandler,
    shootHandler,
    gameoverHandler,
    readyHandler,
    exitHandler,
    chatHandler,
    mailingHandler,
    inviteHandler,
  } = useSocketHandlers();

  const { setGameInfo } = useGameStateActions();
  const { userName, gameInfo } = useAppSelector((state) => {
    const { userName } = state.logInSlice;
    const { gameInfo } = state.gameStateSlice;

    return { userName, gameInfo };
  });

  const {
    shoot,
    connect,
    disconnect,
    ready,
    gameover,
    exit,
    chat,
    mailing,
    invite,
  } = SOCKETMETHOD;

  useEffect(() => {
    socket.current = new WebSocket(SOCKET);

    socket.current.onopen = () => {
      sendSocket(SOCKETMETHOD.setName, { socketName: userName });
      console.log('socket opened');
    };

    socket.current.onmessage = (response) => {
      const data: TSocketMessage = JSON.parse(response.data);
      const { method } = data;

      switch (method) {
        case connect:
          connectHandler(data);
          break;

        case chat:
          chatHandler(data);
          break;

        case mailing:
          mailingHandler(data);
          break;
      }
    };
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.onmessage = (response) => {
        const data: TSocketMessage = JSON.parse(response.data);
        const { method } = data;

        switch (method) {
          case connect:
            connectHandler(data);
            break;

          case disconnect:
            disconnectHandler(data);
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
            exitHandler(data);
            break;

          case mailing:
            mailingHandler(data);
            break;

          case invite:
            inviteHandler(data);
            break;
        }
      };
    }
  }, [socket.current, userName, gameInfo]);

  const sendSocket: TSendSocket = useCallback(
    (method, data) => {
      if (method === SOCKETMETHOD.connect) {
        setGameInfo(data ? (data as ISendConnect) : null);
      }

      if (socket.current) {
        socket.current.send(
          JSON.stringify({
            ...data,
            method: method,
          }),
        );
      }
    },
    [socket],
  );

  return { sendSocket };
};
