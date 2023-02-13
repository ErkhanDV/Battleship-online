// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { IGameShip, IGameShips } from '../_types';

// const initialState: IGameShips = {
//   gameShips: [],
// };

// const gameShips = createSlice({
//   name: 'gameShips',
//   initialState,
//   reducers: {
//     setGameShip(state, action: PayloadAction<IGameShip>) {
//       state.gameShips.push(action.payload);
//     },
//   },
// });

// export const { setGameShip } = gameShips.actions;
// export default gameShips.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGameShips } from '../_types';

const initialState: IGameShips = {
  gameShips: [],
};

const gameShips = createSlice({
  name: 'gameShips',
  initialState,
  reducers: {
    setGameShip(state, action: PayloadAction<number>) {
      state.gameShips.push(action.payload);
    },
  },
});

export const { setGameShip } = gameShips.actions;
export default gameShips.reducer;
