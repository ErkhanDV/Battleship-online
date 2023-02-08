import { type InternalAxiosRequestConfig } from 'axios';

export interface ICycleConfig extends InternalAxiosRequestConfig {
  isRetry?: boolean;
}

export interface IStartGame {
  gameId: string;
  user: IPlayer;
}

export interface IPlayer {
  id: string;
  name: string;
}

export interface ISocketMessage extends IStartGame {
  method: string;
  isGameFinded: boolean;
  isAbleShoot: boolean;
  isStarted?: boolean;
  coordinates?: number;
}
