import { configureStore } from '@reduxjs/toolkit';
import { registrationReducer } from '../features/slices/registrationSlice';
import { authorizationReducer } from '../features/slices/authorizationSlice';
import { authUserReducer } from '../features/slices/authUserSlice';
import { usersReducer } from '../features/slices/usersSlice';
import { tripsReducer } from '../features/slices/tripsSlice';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    authorization: authorizationReducer,
    authUser: authUserReducer,
    users: usersReducer,
    trips: tripsReducer,
  },
});
