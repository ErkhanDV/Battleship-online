import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, IChatMessage } from './types/chat';
import { CHAT } from '../_constants';

const initialState: IChat = {
  currentChat: CHAT.common,
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

    changeChat(state, action: PayloadAction<keyof typeof CHAT>) {
      state.currentChat = CHAT[action.payload];
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
