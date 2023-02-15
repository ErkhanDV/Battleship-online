import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IShipsLocation,
  IShip,
  IWoundedCell,
  IAddShip,
  IAddMiss,
  IAddWoundedCell,
} from '../_types';

const initialState: IShipsLocation = {
  user: {
    shipsLocation: [
      // {
      //   decks: 4,
      //   occupiedCells: [12, 62, 21, 31, 41, 51, 11, 61, 23, 33, 43, 53, 13, 63],
      //   shipLocation: [22, 32, 42, 52],
      //   woundedCells: [22, 52],
      // },
      // {
      //   decks: 3,
      //   occupiedCells: [17, 18, 19, 27, 29, 37, 39, 47, 49, 57, 58, 59],
      //   shipLocation: [28, 38, 48],
      //   woundedCells: [28],
      // },
      // {
      //   decks: 3,
      //   occupiedCells: [44, 45, 46, 84, 85, 86, 54, 64, 74, 56, 66, 76],
      //   shipLocation: [55, 65, 75],
      //   woundedCells: [65],
      // },
    ],
    misses: [],
  },
  rival: {
    shipsLocation: [],
    misses: [],
  },
};

const shipsLocationSlice = createSlice({
  name: 'shipsLocation',
  initialState,
  reducers: {
    addShip(state, action: PayloadAction<IAddShip>) {
      state[action.payload.player as keyof typeof state].shipsLocation.push(
        action.payload.ship,
      );
    },

    addMiss(state, action: PayloadAction<IAddMiss>) {
      state[action.payload.player as keyof typeof state].misses.push(
        action.payload.miss,
      );
    },

    setWoundedCell(state, action: PayloadAction<IAddWoundedCell>) {
      state[action.payload.player as keyof typeof state].shipsLocation[
        action.payload.cell.index
      ].woundedCells.push(action.payload.cell.cellId);
    },

    updateShipsLocationState(state, action: PayloadAction<IShipsLocation>) {
      state.user = action.payload.user;
      state.rival = action.payload.rival;
    },
  },
});

export const { addShip, addMiss, setWoundedCell, updateShipsLocationState } =
  shipsLocationSlice.actions;

export default shipsLocationSlice.reducer;
