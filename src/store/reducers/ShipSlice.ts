import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentShip, IDragedShip } from './types/currentShip';

const initialState: IDragedShip = {
  currentDragedShip: {
    decks: null,
    isHorizontal: false,
  },
  wasDropped: false,
};

const shipSlice = createSlice({
  name: 'ship',
  initialState,
  reducers: {
    setShip(state, action: PayloadAction<ICurrentShip>) {
      state.currentDragedShip.decks = action.payload.decks;
      state.currentDragedShip.isHorizontal = action.payload.isHorizontal;
    },

    setDropped(state, action: PayloadAction<boolean>) {
      state.wasDropped = action.payload;
    },
  },
});

export const { setShip, setDropped } = shipSlice.actions;
export default shipSlice.reducer;
