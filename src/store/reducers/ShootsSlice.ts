import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IShoots } from '../_types';

const initialState: IShoots = {
  own: {
    hits: [],
    misses: [],
  },
  rival: {
    hits: [],
    misses: [],
  },
};

const shoots = createSlice({
  name: 'shoots',
  initialState,
  reducers: {
    addOwnHit(state, action: PayloadAction<number>) {
      state.own.hits.push(action.payload);
    },
    addOwnMiss(state, action: PayloadAction<number>) {
      state.own.misses.push(action.payload);
    },
    addRivalHit(state, action: PayloadAction<number>) {
      state.rival.hits.push(action.payload);
    },
    addRivalMiss(state, action: PayloadAction<number>) {
      state.rival.misses.push(action.payload);
    },
  },
});

export const { addOwnHit } = shoots.actions;
export const { addOwnMiss } = shoots.actions;
export const { addRivalHit } = shoots.actions;
export const { addRivalMiss } = shoots.actions;

export default shoots.reducer;
