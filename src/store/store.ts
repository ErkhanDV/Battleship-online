import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/reducers/UserSlice';
import ships from './reducers/ShipsSlice';
import gameShips from './reducers/GameSlice';

export const store = configureStore({
  reducer: {
    ships,
    gameShips,
    userReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
