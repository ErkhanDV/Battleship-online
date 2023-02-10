import { SOCKET } from '@/services/axios/_constants';
import { IStartGame, ISocketMessage } from './axios/_types';
import { IShipsLocation } from '@/store/_types';

export class Socket {
  socket: WebSocket = new WebSocket(SOCKET);

  private static instance: Socket;

  userName: string = '';

  opponentName: string = '';

  isGameFinded: boolean = false;

  isStarted: boolean = false;

  isAbleShoot: boolean = false;

  winner: string | null = null;

  gameInfo = {} as IStartGame;

  private constructor() {}

  public static getInstance(data: IStartGame): Socket {
    if (!Socket.instance) {
      Socket.instance = new Socket();
      Socket.instance.init(data);
    }

    return Socket.instance;
  }

  init(data: IStartGame) {
    this.gameInfo = data;
    this.socket = new WebSocket(SOCKET);
    this.userName = data.user.name;
    this.opponentName = '';
    this.isGameFinded = false;
    this.isStarted = false;
    this.isAbleShoot = false;
    this.winner = null;

    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({ ...data, method: 'connection' }));
    };

    this.socket.onmessage = (response) => {
      const data: ISocketMessage = JSON.parse(response.data);
      const { method } = data;

      switch (method) {
        case 'connection':
          this.connectHandler(data);
          break;

        case 'start':
          this.startHandler(data);
          break;

        case 'shoot':
          this.shootHandler(data);
          break;

        case 'gameOver':
          this.gameOverHandler(data);
          break;
      }
    };
  }

  connectHandler(data: ISocketMessage) {
    const { user, isAbleShoot, isGameFinded } = data;

    if (user.name !== this.userName) {
      this.opponentName = user.name;
    } else {
      this.isAbleShoot = isAbleShoot;
    }

    this.isGameFinded = isGameFinded;
    console.log('connection');
  }

  startHandler(data: ISocketMessage) {
    if (data.isStarted) {
      this.isStarted = true;
    }
    console.log('start');
  }

  shootHandler(data: ISocketMessage) {
    const { user, coordinates } = data;
    if (user.name === this.userName) {
      this.isAbleShoot = false;
    } else {
      this.isAbleShoot = true;
      //set store coordinates возвращают место куда встрелил соперник, над озакидывать в стор
    }
    console.log('shoot');
  }

  gameOverHandler(data: ISocketMessage) {
    const { user, coordinates } = data;
    //set store coordinates возвращают место куда встрелил соперник, над озакидывать в стор
    this.winner = user.name;
    console.log('gameover');
  }

  setReady(field: IShipsLocation) {
    this.socket.send(JSON.stringify({ ...this.gameInfo, field, method: 'ready' }));
  }

  setShoot(coordinates: number) {
    if (this.isAbleShoot) {
      this.socket.send(JSON.stringify({ ...this.gameInfo, coordinates, method: 'shoot' }));
    }
  }

  exitSocket() {
    this.socket.send(JSON.stringify({ ...this.gameInfo, method: 'exit' }));
  }

  reset() {
    this.socket.close();
  }
}
