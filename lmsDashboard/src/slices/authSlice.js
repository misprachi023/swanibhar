// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  signupCredentials: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup(state, action) {
      state.signupCredentials = action.payload;
      state.isAuthenticated = true;
    },
    login(state, action) {
      state.signupCredentials = action.payload;
        console.log(state.signupCredentials.username, state.signupCredentials.password)
        if(state.signupCredentials.username == 'admin' && state.signupCredentials.password == 'admin'){
          state.isAdmin = true;
        }
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.signupCredentials = {};
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
