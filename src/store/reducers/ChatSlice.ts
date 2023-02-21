import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, IChatMessage } from './types/chat';

const initialState: IChat = {
  currentChat: 'common',
  common: [],
  game: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    pushGameMessage(state, action: PayloadAction<IChatMessage>) {
      state.game.push(action.payload);
    },

    pushCommonMessage(state, action: PayloadAction<IChatMessage>) {
      state.common.push(action.payload);
    },

    resetGameChat(state, action: PayloadAction) {
      state.game = [];
    },

    resetCommonChat(state, action: PayloadAction) {
      state.common = [];
    },

    changeChat(state) {
      state.currentChat = state.currentChat === 'common' ? 'game' : 'common';
    },
  },
});

export const {
  pushGameMessage,
  pushCommonMessage,
  resetGameChat,
  resetCommonChat,
  changeChat,
} = chatSlice.actions;

export default chatSlice.reducer;
