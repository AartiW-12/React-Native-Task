import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from './doctors/doctorSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    doctors: doctorReducer,
    auth: authReducer,
  },
});

export default store;