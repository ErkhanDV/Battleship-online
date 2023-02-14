import { type InternalAxiosRequestConfig } from 'axios';
import { IShip } from '@/store/_types';

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

export interface IConnectMessage {
  method: string;
  isGameFinded: boolean;
  isAbleShoot: boolean;
  field?: IShip[];
}

export interface IStartMessage {
  isStarted: boolean;
  field: IShip[];
}

export interface IShootMessage {
  coordinates: { target: number; isDamaged: boolean };
}

export type TSocketMessage = IStartGame &
  IStartMessage &
  IConnectMessage &
  IShootMessage;
