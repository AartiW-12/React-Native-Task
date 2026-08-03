import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [
    { id: '1', doctorId: '1', status: 'completed', date: '2026-07-12', time: '10:00 AM' },
    { id: '2', doctorId: '8', status: 'upcoming', date: '2026-08-02', time: '09:30 AM' },
    { id: '3', doctorId: '3', status: 'cancelled', date: '2026-07-10', time: '11:00 AM' },
    { id: '4', doctorId: '4', status: 'upcoming', date: '2026-08-06', time: '03:00 PM' },
    { id: '5', doctorId: '6', status: 'completed', date: '2026-10-06', time: '03:00 PM' },
  ],
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.unshift(action.payload);
    },

    completeAppointment: (state, action) => {
      const appointment = state.appointments.find(
        item => item.id === action.payload
      );

      if (appointment) {
        appointment.status = "completed";
      }
    },

    cancelAppointment: (state, action) => {
      const appointment = state.appointments.find(
        item => item.id === action.payload
      );

      if (appointment) {
        appointment.status = "cancelled";
      }
    },
  },
});

export const {
  addAppointment,
  completeAppointment,
  cancelAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;