import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserState } from '@/store/types/_types';

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
