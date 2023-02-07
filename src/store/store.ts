import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/reducers/UserSlice';
import currentShip from './reducers/CurrentShipSlice';
import shipsLocation from './reducers/ShipsLocation';

// const rootReducer = combineReducers({
//   userReducer,
// });

export const store = configureStore({
  reducer: {
    currentShip,
    userReducer,
    shipsLocation,
  },
});

// export type TRootState = ReturnType<typeof rootReducer>;
// export type TAppStore = ReturnType<typeof setupStore>;
// export type TAppDispatch = TAppStore['dispatch'];
