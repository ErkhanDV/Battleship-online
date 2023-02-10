import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentShip, IShip, ShipCoordinates } from '@/store/_types';

const initialState: IShip = {
  currentDragedShip: {
    decks: null,
    isHorizontal: false,
  },
  shipsLocation: [],
  wasDropped: false,
};

const ships = createSlice({
  name: 'ships',
  initialState,
  reducers: {
    setCurrentShip(state, action: PayloadAction<ICurrentShip>) {
      state.currentDragedShip.decks = action.payload.decks;
      state.currentDragedShip.isHorizontal = action.payload.isHorizontal;
    },
    setShipsLocation(state, action: PayloadAction<ShipCoordinates>) {
      state.shipsLocation.push(action.payload);
    },
    setDropped(state, action: PayloadAction<boolean>) {
      state.wasDropped = action.payload;
    },
  },
});

export const { setCurrentShip } = ships.actions;
export const { setShipsLocation } = ships.actions;
export const { setDropped } = ships.actions;
export default ships.reducer;
