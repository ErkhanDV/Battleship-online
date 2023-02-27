import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPopUp } from './types/popUp';

const initialState: IPopUp = {
  isVision: false,
  popUpMessage: '',
};

const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    setVision(state, action: PayloadAction<boolean>) {
      state.isVision = action.payload;
    },

    setPopUpMessage(state, action: PayloadAction<string>) {
      state.popUpMessage = action.payload;
    },
  },
});

export const { setVision, setPopUpMessage } = popUpSlice.actions;

export default popUpSlice.reducer;
