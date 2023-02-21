import { IStartGame } from '@/services/axios/_types';
import { IPlayerState } from '@/store/reducers/types/shipLocation';
import { Dispatch, SetStateAction } from 'react';
import { ISendData } from '@/store/reducers/types/socket';
export interface IGameStateContext {
  socket: WebSocket | null;
  setSocket: Dispatch<SetStateAction<WebSocket | null>>;
  sendSocket: ((method: string, data?: ISendData) => void) | undefined;
  init: (response: IStartGame) => void;
}
