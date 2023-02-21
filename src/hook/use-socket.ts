import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useAppSelector,
  useGameStateActions,
  useGameShipsActions,
} from './_index';
import { SOCKET, SOCKETMETHOD } from '@/services/axios/_constants';
import { PERSON } from '@/store/_constants';
import { ROUTE } from '@/router/_constants';
import {
  IStartGame,
  TSocketMessage,
  IConnect,
  IShoot,
  IReady,
} from '@/store/reducers/types/socket';
import { ISendData } from '@/store/reducers/types/socket';

export const useSocket = () => {
  const navigate = useNavigate();
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
    resetGameState,
  } = useGameStateActions();
  const { updateShipsLocationState, checkShoot, resetGameShips } =
    useGameShipsActions();
  const { gameInfo, userName } = useAppSelector(
    (state) => state.gameStateSlice,
  );

  useEffect(() => {
    if (gameInfo && socket && userName) {
      socket.onopen = () => {
        socket.send(
          JSON.stringify({ ...gameInfo, method: SOCKETMETHOD.connect }),
        );
      };

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
        const { shoot, connect, ready, gameover, exit } = SOCKETMETHOD;

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
            gameOverHandler(data);
            break;

          case exit:
            exitHandler();
            break;
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

      const readyHandler = (data: IReady) => {
        console.log('ready');
        const { isStarted, field, user } = data;
        setIsStarted(!!isStarted);
        if (user !== userName) {
          updateShipsLocationState(field, PERSON.rival);
        }
      };

      const shootHandler = (data: IShoot) => {
        const { user, shoot, isAbleShoot } = data;

        if (user === userName) {
          setIsAbleShoot(isAbleShoot);
          checkShoot(PERSON.rival, shoot);
        } else {
          setIsAbleShoot(!isAbleShoot ? true : false);
          checkShoot(PERSON.user, shoot);
        }
        console.log('shoot');
      };

      const gameOverHandler = (data: IShoot) => {
        const { winner } = data;

        shootHandler(data);
        setIsAbleShoot(false);

        if (winner) {
          if (winner === userName) {
            setWinner('Ты засадил вялого этому парню');
          } else {
            setWinner('Тебя отшлепали как собаку сутулую');
          }
        }

        setTimeout(() => {
          setWinner('');
        }, 3000);

        console.log('gameover');
      };

      const exitHandler = () => {
        setWinner('Противник вышел из боя');
        setTimeout(() => {
          navigate(ROUTE.home);
          setWinner('');
        }, 3000);

        resetGameState();
        resetGameShips();
      };
    }
  }, [gameInfo, socket, userName]);

  const init = (response: IStartGame) => {
    setSocket(new WebSocket(SOCKET));
    setGameInfo(response);
    setUserName(response.user.name);
  };

  const sendSocket = useMemo(() => {
    if (socket) {
      return (method: string, data?: ISendData) => {
        socket?.send(
          JSON.stringify({
            ...data,
            method: method,
          }),
        );
      };
    }
  }, [socket]);

  return { init, socket, setSocket, sendSocket };
};
