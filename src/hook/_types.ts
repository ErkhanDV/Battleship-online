import { IStartGame } from '@/services/axios/_types';

export interface ISocketContext {
  socket: WebSocket | null;
  init: (response: IStartGame) => void;
}
