import { IStartGame } from '@/services/axios/_types';
import { Dispatch, SetStateAction } from 'react';

export interface ISocketContext {
  socket: WebSocket | null;
  setSocket: Dispatch<SetStateAction<WebSocket | null>>;
  init: (response: IStartGame) => void;
}
