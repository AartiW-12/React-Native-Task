import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonServerApi } from '../../services/api'

const initialState = {
    slots: [],
    loading: false,
    error: null,
};

export const fetchSlots = createAsyncThunk(
    "slots/fetchSlots",
    async (_, { rejectWithValue }) => {
        try {
            const response = await jsonServerApi.get("/timeSlots");
            return response.data;
        } catch (err) {
            console.log(err.message)
            rejectWithValue(err.message)
        }

    }
);

const slotSlice = createSlice({
    name: "slots",
    initialState,
    reducers: {},
    extraReducers: builder => {

        builder
            .addCase(fetchSlots.pending, state => {
                state.loading = true;
            })

            .addCase(fetchSlots.fulfilled, (state, action) => {
                state.loading = false;
                state.slots = action.payload;
            })

            .addCase(fetchSlots.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }
});

export default slotSlice.reducer;