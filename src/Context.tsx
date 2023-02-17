import { createContext, useEffect } from 'react';
import { ISocketContext } from './hook/_types';

export const SocketContext = createContext({} as ISocketContext);
