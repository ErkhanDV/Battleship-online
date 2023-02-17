import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IShipsLocation,
  IAddShip,
  IGameState,
  IShoot,
} from './types/shipLocation';
import { PERSON } from '../_constants';

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

    addShoot(state, action: PayloadAction<IShoot>) {
      const player = action.payload.player;
      const ships = state[player as keyof typeof state].shipsLocation.map(
        (ship) => ship.shipLocation,
      );
      const index = ships.findIndex((coordinates) =>
        coordinates.includes(action.payload.cell),
      );
      if (index !== -1) {
        state[player as keyof typeof state].shipsLocation[
          index
        ].woundedCells.push(action.payload.cell);
      } else {
        state[player as keyof typeof state].misses.push(action.payload.cell);
      }
    },

    updateShipsLocationState(state, action: PayloadAction<IGameState>) {
      if (action.payload.person === PERSON.user) {
        state.user = action.payload.state;
      } else {
        state.rival = action.payload.state;
      }
    },
  },
});

export const { addShip, updateShipsLocationState, addShoot } =
  shipsLocationSlice.actions;

export default shipsLocationSlice.reducer;
