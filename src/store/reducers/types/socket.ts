import { IPlayerState } from './shipLocation';
import { IStartGame } from '@/services/axios/_types';

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

export { type IStartGame };
