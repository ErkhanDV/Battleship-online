import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAIState } from './types/AIState';

const initialState: IAIState = {
  currentHit: null,
  possibleCells: [],
  checkedCells: [],
};

const AIStateSlice = createSlice({
  name: 'AIState',
  initialState,
  reducers: {
    setCurrentHit(state, action: PayloadAction<number>) {
      state.currentHit = action.payload;
    },

    setPossibleCells(state, action: PayloadAction<number[]>) {
      state.possibleCells = action.payload;
    },

    setCheckedCells(state, action: PayloadAction<number>) {
      state.checkedCells.push(action.payload);
    },
  },
});

export const { setCurrentHit, setPossibleCells, setCheckedCells } =
  AIStateSlice.actions;
export default AIStateSlice.reducer;
