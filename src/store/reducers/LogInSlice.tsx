import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILogIn } from './types/logIn';

const initialState: ILogIn = {
  userName: '',
  isAuthorized: false,
  isModalOpen: false,
  modalChildren: 'log',
};

const logInSlice = createSlice({
  name: 'logIn',
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
      state.isAuthorized = !!state.userName;
    },

    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },

    setModalChildren(state, action: PayloadAction<string>) {
      state.modalChildren = action.payload;
    },
  },
});

export const { setUserName, setModalOpen, setModalChildren } =
  logInSlice.actions;

export default logInSlice.reducer;
