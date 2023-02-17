import { IPlayerState } from './shipLocation';
import { IStartGame } from '@/services/axios/_types';

export interface ISocket {
  gameInfo: null | IStartGame;
  userName: string;
  opponentName: string;
  isGameFinded: boolean;
  isStarted: boolean;
  isAbleShoot: boolean;
  isReady: boolean;
  winner: string;
}

export interface IConnect {
  method: string;
  isGameFinded: boolean;
  isAbleShoot: boolean;
  field?: IPlayerState;
  opponentName?: string;
  opponentField?: IPlayerState;
}

export interface IStart {
  isStarted: boolean;
  field: IPlayerState;
}

export interface IShoot {
  shoot: number;
  isAbleShoot: boolean;
  winner?: string;
}

export type TSocketMessage = IStartGame & IStart & IConnect & IShoot;

export { type IStartGame };
