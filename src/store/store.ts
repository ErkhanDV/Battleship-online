import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/reducers/UserSlice";

const rootReducer = combineReducers({
  userReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore["dispatch"];
