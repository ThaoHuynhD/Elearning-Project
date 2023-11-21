// src/Redux/courseDetailSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { layThongTinKhoaHoc } from "../Services/api";

const initialState = {
  courseDetail: null,
  isLoading: false,
  error: null,
};

// Async thunk action
export const fetchCourseDetail = createAsyncThunk(
  "courseDetail/fetchCourseDetail",
  async (maKhoaHoc, thunkAPI) => {
    try {
      const response = await layThongTinKhoaHoc(maKhoaHoc);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const courseDetailSlice = createSlice({
  name: "courseDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseDetail = action.payload;
      })
      .addCase(fetchCourseDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = courseDetailSlice.actions;
export default courseDetailSlice.reducer;
