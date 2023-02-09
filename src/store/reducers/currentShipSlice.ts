import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentShip } from '@/store/_types';

const initialState: ICurrentShip = {
  decks: null,
  isHorizontal: false,
};

const currentShipSlice = createSlice({
  name: 'currentShip',
  initialState,
  reducers: {
    setCurrentShip(state, action: PayloadAction<ICurrentShip>) {
      state.decks = action.payload.decks;
      state.isHorizontal = action.payload.isHorizontal;
    },
  },
});

export const { setCurrentShip } = currentShipSlice.actions;
export default currentShipSlice.reducer;