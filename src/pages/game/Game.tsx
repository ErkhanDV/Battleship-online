import { useState, useEffect, type FC } from 'react';
import { gameService } from '@/services/axios/Game';
import { useAppSelector } from '@/store/hook/hook';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Background from '@/components/background/Background';
import Field from '@/components/game/battleground/Field';
import Ship from '@/components/game/ship/ship';
import { useSocket } from '@/hook/use-socket';
import { Socket } from '@/services/Socket';
import { SHIPS } from '@/store/_constants';
import { SOCKET } from '@/services/axios/_constants';
import { IStartGame, ISocketMessage } from '@/services/axios/_types';
import { ShipCoordinates } from '@/store/_types';
import './game.scss';

const Game = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [gameInfo, setGameInfo] = useState<IStartGame | null>(null);
  const [userName, setUserName] = useState('');
  const [opponentName, setOpponentName] = useState('');
  const [isGameFinded, setIsGameFinded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isAbleShoot, setIsAbleShoot] = useState(true);
  const [winner, setWinner] = useState('');

  // const socket = useRef<Socket | null>(null);
  // const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    (async () => {
      const response = await gameService.startGame();

      if (response) {
        setGameInfo(response);
        const instance = new WebSocket(SOCKET);
        setSocket(instance);
        setUserName(response.user.name);
      }
    })();
  }, []);

  useEffect(() => {
    if (gameInfo && socket) {
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

      // socket.current.init(response);
      // setSocket(new Socket(response));
      // socket.current = new Socket(response);
    }
  }, [gameInfo, socket]);

  const settedShips = useAppSelector((state) => state.shipsSlice.shipsLocation);

  const readyHandler = () => {
    socket?.send(JSON.stringify({ ...gameInfo, settedShips, method: 'ready' }));
    // socket.current?.setReady(settedShips);
  };

  const shootHandler = (e: React.MouseEvent): void => {
    if (e.target instanceof HTMLDivElement) {
      const shoot: number = Number(e.target.id);
      if (isAbleShoot) {
        socket?.send(JSON.stringify({ ...gameInfo, shoot, method: 'shoot' }));
      }
      // socket.current?.setShoot(shoot);
    }
  };

  const renderRivalField = () => {
    return (
      <div onClick={shootHandler} className="opponent">
        <Field isAbleShoot={isAbleShoot} isRival={true} />
      </div>
    );
    // if (socket.current?.isGameFinded) {
    //   return (
    //     <div onClick={shootHandler} className="opponent">
    //       <Field isAbleShoot={socket.current.isAbleShoot} isRival={true} />
    //     </div>
    //   );
    // }
  };

  return (
    <div className="game">
      <Header />

      <main className="game-wrapper">
        <button
          disabled={settedShips.flat().length < 20}
          onClick={readyHandler}
          className="ready"
        >
          Ready
        </button>
        <div className="fields">
          <div className="user">
            <Field isAbleShoot={true} />
          </div>
          {isGameFinded ? renderRivalField() : false}
        </div>

        <div className="ship-station">
          {SHIPS.map((decks, i) => (
            <Ship decks={decks} key={i} />
          ))}
        </div>
      </main>
      <Footer />
      <Background />
    </div>
  );
};

export default Game;
