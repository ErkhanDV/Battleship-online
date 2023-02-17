import { createContext } from 'react';
import { ISocketContext } from './hook/_types';

export const SocketContext = createContext({} as ISocketContext);
