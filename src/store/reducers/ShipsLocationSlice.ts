import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IShipsLocation,
  IShip,
  IWoundedCell,
  IAddShip,
  IAddMiss,
  IAddWoundedCell,
  IPlayerState,
} from '../_types';

const initialState: IShipsLocation = {
  user: {
    shipsLocation: [],
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

    updateShipsLocationState(
      state,
      action: PayloadAction<{ state: IPlayerState; person: string }>,
    ) {
      if (action.payload.person === 'user') {
        state.user = action.payload.state;
      } else {
        state.rival = action.payload.state;
      }
    },
  },
});

export const { addShip, addMiss, setWoundedCell, updateShipsLocationState } =
  shipsLocationSlice.actions;

export default shipsLocationSlice.reducer;
