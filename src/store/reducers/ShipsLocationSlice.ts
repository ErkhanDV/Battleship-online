import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IShipsLocation, IShip, IWoundedCell } from '../_types';

const initialState: IShipsLocation = {
  shipsLocation: [],
};

const shipsLocation = createSlice({
  name: 'shipsLocation',
  initialState,
  reducers: {
    addShip(state, action: PayloadAction<IShip>) {
      state.shipsLocation.push(action.payload);
    },
    setWoundedCell(state, action: PayloadAction<IWoundedCell>) {
      state.shipsLocation[action.payload.index].woundedCells.push(
        action.payload.cellId,
      );
    },
  },
});

export const { addShip } = shipsLocation.actions;
export const { setWoundedCell } = shipsLocation.actions;

export default shipsLocation.reducer;
