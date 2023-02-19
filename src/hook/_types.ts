import { IStartGame } from '@/services/axios/_types';
import { IPlayerState } from '@/store/reducers/types/shipLocation';
import { Dispatch, SetStateAction } from 'react';

export interface ISocketContext {
  socket: WebSocket | null;
  setSocket: Dispatch<SetStateAction<WebSocket | null>>;
  sendSocket: (
    method: string,
    data?: { field: IPlayerState } | { shoot: number },
  ) => void;
  init: (response: IStartGame) => void;
}
