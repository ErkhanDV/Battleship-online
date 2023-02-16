import { useAppDispatch } from '@/hook/use-redux';
import * as socketActions from '@/store/reducers/socketSlice';
import userSlice from './userSlice';
import currentShipSlice from './currentShipSlice';
import shipsLocationSlice from './shipsLocationSlice';
import socketSlice from './socketSlice';

export { userSlice, shipsLocationSlice, currentShipSlice, socketSlice };

