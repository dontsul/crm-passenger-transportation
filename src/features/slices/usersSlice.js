import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../thunk/getUsers';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    usersList: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersList = action.payload;
        state.loading = 'idle';
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state) => {
          state.loading = 'idle';
          state.error = 'Error';
          console.log('error');
        }
      );
  },
});

export const usersReducer = usersSlice.reducer;
