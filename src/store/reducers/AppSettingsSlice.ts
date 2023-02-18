import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAppSettings } from './types/appSettings';

const initialState: IAppSettings = {
  lang: 'en',
  theme: 'green',
  sound: true,
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    changeLang(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },

    changeTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },

    toggleSound(state, action: PayloadAction<boolean>) {
      state.sound = action.payload;
    },
  },
});

export const { changeLang, changeTheme, toggleSound } =
  appSettingsSlice.actions;
export default appSettingsSlice.reducer;
