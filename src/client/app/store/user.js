import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
