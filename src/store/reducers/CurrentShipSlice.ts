import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentShip } from '@/store/types/_types';

const initialState: ICurrentShip = {
  decks: null,
  isHorizontal: false,
};

const currentShip = createSlice({
  name: 'currentShip',
  initialState,
  reducers: {
    setCurrentShip(state, action: PayloadAction<ICurrentShip>) {
      state.decks = action.payload.decks;
      state.isHorizontal = action.payload.isHorizontal;
    },
  },
});

export const { setCurrentShip } = currentShip.actions;
export default currentShip.reducer;
