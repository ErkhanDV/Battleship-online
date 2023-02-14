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

const shootsSlice = createSlice({
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

export const { addOwnHit, addOwnMiss, addRivalHit, addRivalMiss } =
  shootsSlice.actions;

export default shootsSlice.reducer;
