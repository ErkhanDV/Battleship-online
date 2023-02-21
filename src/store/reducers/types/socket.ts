import { IPlayerState } from './shipLocation';
import { IStartGame } from '@/services/axios/_types';
import { IChatMessage } from './chat';

export interface IGameState {
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

export interface IReady {
  user: string;
  method: string;
  isStarted: boolean;
  field: IPlayerState;
}

export interface IShoot {
  user: string;
  shoot: number;
  isAbleShoot: boolean;
  winner?: string;
}

export interface ISendData {
  field?: IPlayerState;
  shoot?: number;
  message?: IChatMessage;
}

export type TSocketMessage = IStartGame & IReady & IConnect & IShoot;

export { type IStartGame };
