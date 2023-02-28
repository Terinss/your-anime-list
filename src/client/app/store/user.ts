import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: string | null;
}

const initialState: UserState = { user: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
