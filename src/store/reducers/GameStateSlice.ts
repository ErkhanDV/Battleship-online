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
  gameDifficult: 0,
};

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setGameInfo(state, action: PayloadAction<IStartGame | null>) {
      state.gameInfo = action.payload;
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

    setGameDifficult(state, action: PayloadAction<number>) {
      state.gameDifficult = action.payload;
    },
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
  setGameDifficult,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
