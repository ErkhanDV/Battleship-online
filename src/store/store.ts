import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/reducers/UserSlice';
import currentShip from './reducers/CurrentShipSlice';
import shipsLocation from './reducers/ShipsLocationSlice';
import shoots from './reducers/ShootsSlice';

export const store = configureStore({
  reducer: {
    currentShip,
    shipsLocation,
    shoots,
    userReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
