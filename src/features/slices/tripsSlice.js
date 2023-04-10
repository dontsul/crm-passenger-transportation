import { createSlice } from '@reduxjs/toolkit';
import { getTrips } from '../../thunk/getTrips';

const tripsSlice = createSlice({
  name: 'users',
  initialState: {
    tripsList: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrips.fulfilled, (state, action) => {
        state.tripsList = action.payload;
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

export const tripsReducer = tripsSlice.reducer;
