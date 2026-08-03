import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from './doctors/doctorSlice';
import authReducer from './auth/authSlice';
import appointmentReducer from './appointment/appointmentSlice'

const store = configureStore({
  reducer: {
    doctors: doctorReducer,
    auth: authReducer,
    appointments: appointmentReducer
  },
});

export default store;