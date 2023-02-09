import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IShipsLocation, ShipCoordinates } from '@/store/_types';

const initialState: IShipsLocation = {
  shipsLocation: [],
};

const shipsLocationSlice = createSlice({
  name: 'shipsLocation',
  initialState,
  reducers: {
    setShipsLocation(state, action: PayloadAction<ShipCoordinates>) {
      state.shipsLocation.push(action.payload);
    },
  },
});

export const { setShipsLocation } = shipsLocationSlice.actions;
export default shipsLocationSlice.reducer;