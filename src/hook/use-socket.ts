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
    shootHandler,
    gameoverHandler,
    readyHandler,
    exitHandler,
    chatHandler,
  } = useSocketHandlers();

  const { setGameInfo } = useGameStateActions();
  const { userName } = useAppSelector((state) => state.logInSlice);
  const { gameInfo } = useAppSelector((state) => state.gameStateSlice);

  const { shoot, connect, ready, gameover, exit, chat } = SOCKETMETHOD;

  useEffect(() => {
    socket.current = new WebSocket(SOCKET);

    socket.current.onopen = () => console.log('socket opened');

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
      }
    };

    // window.onunload = () => {
    //   socket.current?.close();
    // };
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
  }, [socket.current, userName, gameInfo]);

  const sendSocket: TSendSocket = useCallback(
    (method, data) => {
      if (method === SOCKETMETHOD.connect) {
        console.log(data);
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
