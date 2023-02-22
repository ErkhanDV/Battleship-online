import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCorrectShip } from '@/lib/API/ShipsPlacer/ShipsPlacer';
import {
  IGameShips,
  IAddShip,
  IPersonState,
  IShoot,
  IRandomState,
  IShip,
  IAddNotAllowed,
} from './types/shipLocation';
import { SHIPS } from '../_constants';

const initialState: IGameShips = {
  user: {
    shipsLocation: [],
    misses: [],
    notAllowed: [],
  },
  rival: {
    shipsLocation: [],
    misses: [],
    notAllowed: [],
  },
};

const gameShipsSlice = createSlice({
  name: 'gameShips',
  initialState,
  reducers: {
    addShip(state, action: PayloadAction<IAddShip>) {
      const { person } = action.payload;
      state[person].shipsLocation.push(action.payload.ship);
    },

    addShoot(state, action: PayloadAction<IShoot>) {
      const { person, cell } = action.payload;
      const ships = state[person].shipsLocation.map(
        (ship) => ship.shipLocation,
      );
      const index = ships.findIndex((coordinates) =>
        coordinates.includes(cell),
      );
      if (index !== -1) {
        state[person].shipsLocation[index].woundedCells.push(cell);
      } else {
        state[person].misses.push(cell);
      }
    },

    resetShips(state) {
      state.user.shipsLocation = [];
    },

    resetGameShips: () => initialState,

    updateShipsState(state, action: PayloadAction<IPersonState>) {
      state[action.payload.person] = action.payload.state;
    },

    setRandomShips(state, action: PayloadAction<IRandomState>) {
      const person = action.payload.person;
      const ships = action.payload.ships ? action.payload.ships : SHIPS;

      const settedShips = [...state[person].shipsLocation];
      const newShips: IShip[] = [];
      ships.forEach((ship) => {
        getCorrectShip(settedShips, newShips, ship);
      });
      newShips.forEach((ship) => {
        state[person].shipsLocation.push(ship);
      });
    },

    addNotAllowed(state, action: PayloadAction<IAddNotAllowed>) {
      const { person, notAllowed } = action.payload;
      state[person].notAllowed.push(...notAllowed);
    },
  },
});

export const {
  addShip,
  updateShipsState,
  setRandomShips,
  addShoot,
  resetShips,
  resetGameShips,
  addNotAllowed,
} = gameShipsSlice.actions;

export default gameShipsSlice.reducer;
