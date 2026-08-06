import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonServerApi } from "../../services/api";

const initialState = {
  appointments: [],
  loading: false,
  error: null,
}

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await jsonServerApi.get("/appointments")

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addAppointment = createAsyncThunk(
  "appointments/addAppointment",
  async (data,{ rejectWithValue }) => {
    try {
      const response = await jsonServerApi.post("/appointments",data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const completeAppointment = createAsyncThunk(
  "appointments/completeAppointment",
  async (id, { getState }) => {

    const appointment = getState()
      .appointments
      .appointments
      .find(item => item.id === id);

    const response = await jsonServerApi.patch(
      `/appointments/${id}`,
      {
        status: "completed"
      }
    );

    return response.data;
  }
)
export const cancelAppointment = createAsyncThunk(
  "appointments/cancelAppointment",
  async (id) => {

    const response = await jsonServerApi.patch(
      `/appointments/${id}`,
      {
        status: "cancelled"
      }
    );

    return response.data;
  }
)
const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder

      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null
      })

      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
        state.error = null
      })

      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })

      .addCase(addAppointment.fulfilled, (state, action) => {
        state.appointments.unshift(action.payload);
      })

      .addCase(completeAppointment.fulfilled, (state, action) => {

        const index = state.appointments.findIndex(
          item => item.id === action.payload.id
        );

        if (index !== -1) {
          state.appointments[index] = action.payload;
        }

      })

      .addCase(cancelAppointment.fulfilled, (state, action) => {

        const index = state.appointments.findIndex(
          item => item.id === action.payload.id
        );

        if (index !== -1) {
          state.appointments[index] = action.payload;
        }

      })

  }
});

export default appointmentSlice.reducer;