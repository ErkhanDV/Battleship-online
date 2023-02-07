import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/reducers/UserSlice';
import currentShipSlice from './reducers/CurrentShipSlice';

// const rootReducer = combineReducers({
//   userReducer,
// });

export const store = configureStore({
  reducer: {
    currentShipSlice,
    userReducer,
  },
});

// export type TRootState = ReturnType<typeof rootReducer>;
// export type TAppStore = ReturnType<typeof setupStore>;
// export type TAppDispatch = TAppStore['dispatch'];
