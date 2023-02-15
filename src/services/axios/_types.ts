import { type InternalAxiosRequestConfig } from 'axios';
import { IPlayerState } from '@/store/_types';

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
  field?: IPlayerState;
  opponentName?: string;
  opponentField?: IPlayerState;
}

export interface IStartMessage {
  isStarted: boolean;
  field: IPlayerState;
}

export interface IShootMessage {
  coordinates: { target: number; isDamaged: boolean };
}

export type TSocketMessage = IStartGame &
  IStartMessage &
  IConnectMessage &
  IShootMessage;
