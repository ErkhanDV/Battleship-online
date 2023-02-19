import { useState, useEffect } from 'react';
import { useAppSelector } from '@/hook/use-redux';
import { useSocketActions, useShipLocationActions } from './_index';
import { SOCKET, SOCKETMETHOD } from '@/services/axios/_constants';
import {
  IStartGame,
  TSocketMessage,
  IConnect,
  IShoot,
  IStart,
} from '@/store/reducers/types/socket';
import { PERSON } from '@/store/_constants';
import { IPlayerState } from '@/store/reducers/types/shipLocation';

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
        socket.send(
          JSON.stringify({ ...gameInfo, method: SOCKETMETHOD.connect }),
        );
      };

      socket.onmessage = (response) => {
        const data: TSocketMessage = JSON.parse(response.data);
        const { method } = data;
        const { shoot, connect, start, gameover, exit } = SOCKETMETHOD;

        switch (method) {
          case connect:
            connectHandler(data);
            break;

          case start:
            startHandler(data);
            break;

          case shoot:
            shootHandler(data);
            break;

          case gameover:
            gameOverHandler(data);
            break;

          case exit:
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
            updateShipsLocationState(field, PERSON.user);
          }

          if (opponentName) {
            setOpponentName(opponentName);
          }

          if (opponentField) {
            updateShipsLocationState(opponentField, PERSON.rival);
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
          updateShipsLocationState(field, PERSON.rival);
        }
      };

      const shootHandler = (data: IStartGame & IShoot) => {
        const { user, shoot, isAbleShoot } = data;
        setIsAbleShoot(user.name !== userName);

        if (user.name === userName) {
          setIsAbleShoot(isAbleShoot);
          checkShoot(PERSON.rival, shoot);
        } else {
          setIsAbleShoot(!isAbleShoot ? true : false);
          checkShoot(PERSON.user, shoot);
        }
        console.log('shoot');
      };

      const gameOverHandler = (data: IStartGame & IShoot) => {
        const { winner } = data;

        shootHandler(data);
        setIsAbleShoot(false);

        if (winner) setWinner(winner);

        console.log('gameover');
      };
    }
  }, [gameInfo, socket, userName]);

  const init = (response: IStartGame) => {
    setSocket(new WebSocket(SOCKET));
    setGameInfo(response);
    setUserName(response.user.name);
  };

  const sendSocket = (
    method: string,
    data?: { feild: IPlayerState } | { shoot: number },
  ) => {
    socket?.send(
      JSON.stringify({
        ...gameInfo,
        ...data,
        method: SOCKETMETHOD.ready,
      }),
    );
  };

  return { init, socket, setSocket, sendSocket };
};
