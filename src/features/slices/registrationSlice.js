import { createSlice } from '@reduxjs/toolkit';

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    form: {
      userEmail: '',
      userPhone: '',
      userName: '',
      userPassword: '',
      userRole: 'passenger',
    },

    isLoading: false,
  },
  reducers: {
    changeUserEmail(state, action) {
      state.form.userEmail = action.payload;
    },
    changeUserPhone(state, action) {
      state.form.userPhone = action.payload;
    },
    changeUserName(state, action) {
      state.form.userName = action.payload;
    },
    changeUserPassword(state, action) {
      state.form.userPassword = action.payload;
    },
    changeUserRole(state, action) {
      state.form.userRole = action.payload;
    },
    changeStatusLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});
export const registrationReducer = registrationSlice.reducer;
export const {
  changeUserEmail,
  changeUserPhone,
  changeUserName,
  changeUserPassword,
  changeUserRole,
  changeStatusLoading,
} = registrationSlice.actions;
