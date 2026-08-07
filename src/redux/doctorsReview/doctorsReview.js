import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonServerApi } from "../../services/api";

const initialState = {
  reviews: [],
  loadingReview: false,
  errorReviewReview: null,
};

export const addDoctorsReview = createAsyncThunk(
  "reviews/addDoctorsReview",
  async ({ doctorId, userId, review }, { rejectWithValue }) => {
    try {
      const response = await jsonServerApi.post("/reviews", {
        doctorId,
        userId,
        review,
        createdAt: new Date().toISOString(),
      });

      console.log("REVIEW ", response.data)

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addDoctorsReview.pending, state => {
        state.loadingReview = true;
      })
      .addCase(addDoctorsReview.fulfilled, (state, action) => {
        state.loadingReview = false;
        state.reviews.unshift(action.payload);
      })
      .addCase(addDoctorsReview.rejected, (state, action) => {
        state.loadingReview = false;
        state.errorReview = action.payload;
      });
  },
});

export default reviewSlice.reducer;