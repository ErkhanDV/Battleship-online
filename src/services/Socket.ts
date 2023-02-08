import { SOCKET } from '@/services/axios/_constants';
import { IStartGame, ISocketMessage } from './axios/_types';
import { IShipsLocation } from '@/store/_types';

export class Socket {
  instance: WebSocket;

  userName: string;

  opponentName: string | undefined;

  isGameFinded: boolean;

  isStarted: boolean;

  isAbleShoot: boolean;

  winner: string | null;

  gameInfo: IStartGame;

  constructor(data: IStartGame) {
    this.gameInfo = data;
    this.instance = new WebSocket(SOCKET);
    this.userName = data.user.name;
    this.opponentName = undefined;
    this.isGameFinded = false;
    this.isStarted = false;
    this.isAbleShoot = false;
    this.winner = null;

    this.instance.onopen = () => {
      this.instance.send(JSON.stringify({ ...data, method: 'connection' }));
    };

    this.instance.onmessage = (response) => {
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
  }

  startHandler(data: ISocketMessage) {
    if (data.isStarted) {
      this.isStarted = true;
    }
  }

  shootHandler(data: ISocketMessage) {
    const { user, coordinates } = data;
    if (user.name === this.userName) {
      this.isAbleShoot = false;
    } else {
      this.isAbleShoot = true;
      //set store coordinates возвращают место куда встрелил соперник, над озакидывать в стор
    }
  }

  gameOverHandler(data: ISocketMessage) {
    const { user, coordinates } = data;
    //set store coordinates возвращают место куда встрелил соперник, над озакидывать в стор
    this.winner = user.name;
  }

  setReady(field: IShipsLocation) {
    this.instance.send(JSON.stringify({ ...this.gameInfo, field, method: 'ready' }));
  }

  setShoot(coordinates: number) {
    if (this.isAbleShoot) {
      this.instance.send(JSON.stringify({ ...this.gameInfo, coordinates, method: 'shoot' }));
    }
  }

  exitSocket() {
    this.instance.send(JSON.stringify({ ...this.gameInfo, method: 'exit' }));
  }
}
