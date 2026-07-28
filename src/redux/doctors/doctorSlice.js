import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  doctors: [],
  loading: false,
  error: null,
};

export const getDoctors = createAsyncThunk(
    'doctors/getDoctors',
    async(_,{rejectWithValue}) => {
        try{
            const response = await api.get('/doctors')
            return response.data
        }catch(err){
            return rejectWithValue(err.message)
        }
    }
)

const doctorSlice = createSlice({
    name:"doctors",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getDoctors.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getDoctors.fulfilled, (state, action) => {
            state.loading= false
            state.doctors = action.payload
        })
        .addCase(getDoctors.rejected, (state, action) => {
            state.loading= false
            state.error = action.payload
        })  
    }
})

export default doctorSlice.reducer