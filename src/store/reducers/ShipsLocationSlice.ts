import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IShipsLocation, IShip, IWoundedCell } from '../_types';

const initialState: IShipsLocation = {
  shipsLocation: [],
};

const shipsLocationSlice = createSlice({
  name: 'shipsLocation',
  initialState,
  reducers: {
    addShip(state, action: PayloadAction<IShip>) {
      state.shipsLocation.push(action.payload);
    },

    setWoundedCell(state, action: PayloadAction<number>) {
      state.shipsLocation.forEach((ship) => {
        const cell = ship.shipLocation.find(
          (cell) => cell === action.payload,
        );
        if (cell) {
          ship.woundedCells.push(cell);
        }
      });
    },
  },
});

export const { setWoundedCell, addShip } = shipsLocationSlice.actions;

export default shipsLocationSlice.reducer;
