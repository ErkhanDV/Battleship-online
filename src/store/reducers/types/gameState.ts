import { IStartGame } from '@/services/axios/_types';

export interface IGameShipsState {
  singlePlayer: boolean;
  isWin: boolean;
  isStartSingle: boolean;
  userTurn: boolean;
  gameDifficulty: number;
}

export interface IGameState {
  gameInfo: null | IStartGame;
  opponentName: string;
  isGameFinded: boolean;
  isStarted: boolean;
  isAbleShoot: boolean;
  isReady: boolean;
  winner: string;
  invite: string;
  gameDifficult: number;
}
