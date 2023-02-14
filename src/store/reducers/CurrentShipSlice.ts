import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentShip, IDragedShip } from '@/store/_types';

const initialState: IDragedShip = {
  currentDragedShip: {
    decks: null,
    isHorizontal: false,
  },
  wasDropped: false,
};

const currentShip = createSlice({
  name: 'currentShip',
  initialState,
  reducers: {
    setCurrentShip(state, action: PayloadAction<ICurrentShip>) {
      state.currentDragedShip.decks = action.payload.decks;
      state.currentDragedShip.isHorizontal = action.payload.isHorizontal;
    },
    setDropped(state, action: PayloadAction<boolean>) {
      state.wasDropped = action.payload;
    },
  },
});

export const { setCurrentShip } = currentShip.actions;
export const { setDropped } = currentShip.actions;
export default currentShip.reducer;
