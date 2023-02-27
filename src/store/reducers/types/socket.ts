import { IPlayerState } from './shipLocation';
import { IPlayer, IStartGame } from '@/services/axios/_types';
import { IChatMessage } from './chat';

export interface IGameState {
  gameInfo: null | IStartGame;
  opponentName: string;
  isGameFinded: boolean;
  isStarted: boolean;
  isAbleShoot: boolean;
  isReady: boolean;
  winner: string;
  gameDifficult: number;
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
  isStarted: boolean;
  field: IPlayerState;
}

export interface IShoot {
  user: string;
  shoot: number;
  isAbleShoot: boolean;
  winner?: string;
}

export interface IMessage {
  mail: IChatMessage;
}

export interface IMailing {
  chatName: string;
  chatMessage: IChatMessage[];
}

export interface ISendConnect {
  gameId: string;
  user: IPlayer;
}

export interface ISendReady {
  field: IPlayerState;
}

export interface ISendShoot {
  shoot: number;
}

export interface ISendChat {
  mail: IChatMessage;
}

export type TSendData = ISendConnect | ISendReady | ISendShoot | ISendChat;

export type TSocketMessage = IStartGame &
  IReady &
  IConnect &
  IShoot &
  IMessage &
  IMailing;

export type TSendSocket = <T extends TSendData>(
  method: string,
  data?: T,
) => void;

export { type IStartGame };
