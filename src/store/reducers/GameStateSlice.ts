import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGameState } from './types/gameState';

const initialState: IGameState = {
  singlePlayer: false,
  isWin: false,
  isStartSingle: false,
};

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    changeGameMode(state, action: PayloadAction<boolean>) {
      state.singlePlayer = action.payload;
    },

    setWinGame(state, action: PayloadAction<boolean>) {
      state.singlePlayer = action.payload;
    },

    changeGameStatus(state, action: PayloadAction<boolean>) {
      state.isStartSingle = action.payload;
    },
  },
});

export const { changeGameMode, setWinGame, changeGameStatus } =
  gameStateSlice.actions;

export default gameStateSlice.reducer;
