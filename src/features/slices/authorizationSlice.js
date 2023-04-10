import { createSlice } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    form: {
      userEmail: '',
      userPassword: '',
      userPhone: '',
    },

    isLoading: false,
  },
  reducers: {
    changeUserLoginEmail(state, action) {
      state.form.userEmail = action.payload;
    },
    changeUserLoginPhone(state, action) {
      state.form.userPhone = action.payload;
    },
    changeUserLoginPassword(state, action) {
      state.form.userPassword = action.payload;
    },

    changeStatusLoginLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const authorizationReducer = authorizationSlice.reducer;
export const {
  changeUserLoginEmail,
  changeUserLoginPhone,
  changeUserLoginPassword,
  changeStatusLoginLoading,
} = authorizationSlice.actions;
