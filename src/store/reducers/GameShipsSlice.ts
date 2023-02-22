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
    ships: [],
    misses: [],
    notAllowed: [],
  },
  rival: {
    ships: [],
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
      state[person].ships.push(action.payload.ship);
    },

    addShoot(state, action: PayloadAction<IShoot>) {
      const { person, cell } = action.payload;
      const ships = state[person].ships.map(
        (ship) => ship.shipLocation,
      );
      const index = ships.findIndex((coordinates) =>
        coordinates.includes(cell),
      );
      if (index !== -1) {
        state[person].ships[index].woundedCells.push(cell);
      } else {
        state[person].misses.push(cell);
      }
    },

    resetShips(state) {
      state.user.ships = [];
    },

    resetGameShips: () => initialState,

    updateShipsState(state, action: PayloadAction<IPersonState>) {
      state[action.payload.person] = action.payload.state;
    },

    setRandomShips(state, action: PayloadAction<IRandomState>) {
      const person = action.payload.person;
      const ships = action.payload.ships ? action.payload.ships : SHIPS;

      const settedShips = [...state[person].ships];
      const newShips: IShip[] = [];
      ships.forEach((ship) => {
        getCorrectShip(settedShips, newShips, ship);
      });
      newShips.forEach((ship) => {
        state[person].ships.push(ship);
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
