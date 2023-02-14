import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IShipsLocation, IShip, IWoundedCell } from '../_types';

const initialState: IShipsLocation = {
  shipsLocation: [
    {
      decks: 4,
      occupiedCells: [12, 62, 21, 31, 41, 51, 11, 61, 23, 33, 43, 53, 13, 63],
      shipLocation: [22, 32, 42, 52],
      woundedCells: [22, 52],
    },
    {
      decks: 3,
      occupiedCells: [17, 18, 19, 27, 29, 37, 39, 47, 49, 57, 58, 59],
      shipLocation: [28, 38, 48],
      woundedCells: [28],
    },
    {
      decks: 3,
      occupiedCells: [44, 45, 46, 84, 85, 86, 54, 64, 74, 56, 66, 76],
      shipLocation: [55, 65, 75],
      woundedCells: [65],
    },
  ],
  misses: [1, 2, 3],
};

const shipsLocationSlice = createSlice({
  name: 'shipsLocation',
  initialState,
  reducers: {
    addShip(state, action: PayloadAction<IShip>) {
      state.shipsLocation.push(action.payload);
    },

    addMiss(state, action: PayloadAction<number>) {
      state.misses.push(action.payload);
    },

    setWoundedCell(state, action: PayloadAction<IWoundedCell>) {
      state.shipsLocation[action.payload.index].woundedCells.push(
        action.payload.cellId,
      );
    },
  },
});

export const { setWoundedCell, addMiss, addShip } = shipsLocationSlice.actions;

export default shipsLocationSlice.reducer;
