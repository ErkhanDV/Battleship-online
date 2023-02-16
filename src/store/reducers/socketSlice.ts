import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISocket, IStartGame } from './types/socket';

const initialState: ISocket = {
  gameInfo: null,
  userName: '',
  opponentName: '',
  isGameFinded: false,
  isStarted: false,
  isAbleShoot: false,
  isReady: false,
  winner: '',
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setGameInfo(state, action: PayloadAction<IStartGame>) {
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
} = socketSlice.actions;

export default socketSlice.reducer;
