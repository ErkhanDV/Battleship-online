import { IStartGame } from '@/services/axios/_types';
import { IPlayerState } from '@/store/reducers/types/shipLocation';
import { Dispatch, SetStateAction } from 'react';
import { TSendData } from '@/store/reducers/types/socket';
export interface IGameStateContext {
  socket: WebSocket;
  sendSocket: <T extends TSendData>(method: string, data?: T) => void;
}
