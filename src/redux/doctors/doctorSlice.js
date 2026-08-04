import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
    doctors: [],
    loading: false,
    error: null,
};

export const getDoctors = createAsyncThunk(
    'doctors/getDoctors',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/doctors')
            return response.data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const toggleFavorite = createAsyncThunk(
    "doctors/toggleFavorite",
    async ({ id, favorite }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/doctors/${id}`, {
                favorite: !favorite,
            });

            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const doctorSlice = createSlice({
    name: "doctors",
    initialState,
    reducers: {
        // toggleFavorite : (state, action) => {
        //     const doctor = state.doctors.find(item => item.id === action.payload)
        //     if( doctor){
        //         doctor.favorite = !doctor.favorite
        // }
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDoctors.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getDoctors.fulfilled, (state, action) => {
                state.loading = false
                state.doctors = action.payload
            })
            .addCase(getDoctors.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                const index = state.doctors.findIndex(
                    doctor => doctor.id === action.payload.id
                );
                if (index !== -1) {
                    state.doctors[index] = action.payload;
                }
            })
            .addCase(toggleFavorite.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
})

// export const { toggleFavorite } = doct/orSlice.actions

export default doctorSlice.reducer