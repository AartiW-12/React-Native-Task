import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from './doctors/doctorSlice';
import authReducer from './auth/authSlice';
import appointmentReducer from './appointment/appointmentSlice'
import slotsReducer from './slots/slotSlice'
import doctorsReviewReducer from './doctorsReview/doctorsReview'

const store = configureStore({
  reducer: {
    doctors: doctorReducer,
    auth: authReducer,
    appointments: appointmentReducer,
    slots: slotsReducer,
    doctorsReview : doctorsReviewReducer
  },
});

export default store;