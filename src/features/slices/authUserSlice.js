import { createSlice } from '@reduxjs/toolkit';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: {
    user: {},
    authStatus: false,
  },
  reducers: {
    createUser(state, action) {
      console.log(action.payload);
      state.user = { ...action.payload };
    },
    changeAuthUserStatus(state, action) {
      state.authStatus = action.payload;
    },
  },
});

export const authUserReducer = authUserSlice.reducer;
export const { changeAuthUserStatus, createUser } = authUserSlice.actions;
