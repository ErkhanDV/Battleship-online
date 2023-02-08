import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/reducers/UserSlice';
import currentShip from './reducers/CurrentShipSlice';
import shipsLocation from './reducers/ShipsLocationSlice';

export const store = configureStore({
  reducer: {
    currentShip,
    userReducer,
    shipsLocation,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
