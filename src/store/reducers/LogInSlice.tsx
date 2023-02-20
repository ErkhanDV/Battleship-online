import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILogIn } from './types/logIn';
import { MODAL } from '@/components/modal/_constants';

const initialState: ILogIn = {
  user: '',
  isAuthorized: false,
  isModalOpen: false,
  modalChildren: 'log',
};

const logInSlice = createSlice({
  name: 'logIn',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
      state.isAuthorized = !!state.user;
    },

    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },

    setModalChildren(state, action: PayloadAction<string>) {
      state.modalChildren = action.payload;
    },
  },
});

export const { setUser, setModalOpen, setModalChildren } = logInSlice.actions;

export default logInSlice.reducer;
