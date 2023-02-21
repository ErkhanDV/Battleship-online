import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGameState, IStartGame } from './types/socket';

const initialState: IGameState = {
  gameInfo: null,
  userName: '',
  opponentName: 'Unknown',
  isGameFinded: false,
  isStarted: false,
  isAbleShoot: false,
  isReady: false,
  winner: '',
};

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setGameInfo(state, action: PayloadAction<IStartGame>) {
      state.gameInfo = action.payload;
      console.log(state.gameInfo);
    },

    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },

    setOpponentName(state, action: PayloadAction<string>) {
      state.opponentName = action.payload;
    },

    setGameFinded(state, action: PayloadAction<boolean>) {
      state.isGameFinded = action.payload;
    },

    setStarted(state, action: PayloadAction<boolean>) {
      state.isStarted = action.payload;
    },

    setAbleShoot(state, action: PayloadAction<boolean>) {
      state.isAbleShoot = action.payload;
    },

    setReady(state, action: PayloadAction<boolean>) {
      state.isReady = action.payload;
    },

    setWinner(state, action: PayloadAction<string>) {
      state.winner = action.payload;
    },

    resetGameState: () => initialState,
  },
});

export const {
  setGameInfo,
  setUserName,
  setOpponentName,
  setGameFinded,
  setStarted,
  setAbleShoot,
  setReady,
  setWinner,
  resetGameState,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
