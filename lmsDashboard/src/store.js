// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import coursesReducer from './slices/courseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
  },
});
