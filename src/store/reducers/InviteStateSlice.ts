import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInviteState } from './types/inviteState';

const initialState: IInviteState = {
  invite: '',
  inviteValidation: '',
  inviteInProgress: false,
};

export const inviteStateSlice = createSlice({
  name: 'inviteState',
  initialState,
  reducers: {
    setInvite(state, action: PayloadAction<string>) {
      state.invite = action.payload;
    },

    setInviteValidation(state, action: PayloadAction<string>) {
      state.inviteValidation = action.payload;
    },

    setInviteInProgress(state, action: PayloadAction<boolean>) {
      state.inviteInProgress = action.payload;
    },

    resetInviteState: () => initialState,
  },
});

export const {
  setInvite,
  setInviteValidation,
  setInviteInProgress,
  resetInviteState,
} = inviteStateSlice.actions;

export default inviteStateSlice.reducer;
