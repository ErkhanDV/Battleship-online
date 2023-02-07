import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IShipsLocation, ShipCoordinates } from '@/store/_types';

const initialState: IShipsLocation = {
  shipsLocation: [],
};

const shipsLocation = createSlice({
  name: 'shipsLocation',
  initialState,
  reducers: {
    setShipsLocation(state, action: PayloadAction<ShipCoordinates>) {
      state.shipsLocation = [...state.shipsLocation, action.payload];
    },
  },
});

export const { setShipsLocation } = shipsLocation.actions;
export default shipsLocation.reducer;
