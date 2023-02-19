import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAppSettings } from './types/appSettings';

const initialState: IAppSettings = {
  language: 'en',
  theme: 'dark',
  scheme: 'green',
  sound: true,
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },

    changeTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },

    changeScheme(state, action: PayloadAction<string>) {
      state.scheme = action.payload;
    },

    toggleSound(state, action: PayloadAction<boolean>) {
      state.sound = action.payload;
    },
  },
});

export const { changeLanguage, changeTheme, changeScheme, toggleSound } =
  appSettingsSlice.actions;
export default appSettingsSlice.reducer;
