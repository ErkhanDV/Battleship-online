import { createContext } from 'react';
import { IGameStateContext } from './hook/_types';

export const SocketContext = createContext({} as IGameStateContext);
