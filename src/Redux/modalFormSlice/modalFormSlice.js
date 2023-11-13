import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { layThongTinKhoaHoc } from "../../Services/api";

const initialState = {
  isModalOpen: false,
  infoCourse: {},
  loading: false,
  isChecked: false,
};
export const getInfoCourse = createAsyncThunk(
  "getInfo",
  async (maKhoaHoc, { dispatch }) => {
    try {
      let res = await layThongTinKhoaHoc(maKhoaHoc);
      if (res.status === 200) {
        dispatch(setIsModalOpen(true));
        dispatch(setInfoCourse(res.data));
        return res.data;
      }
    } catch (error) {
      throw error;
    }
  },
);

const modalFormSlice = createSlice({
  name: "modalAddForm",
  initialState,
  reducers: {
    setInfoCourse: (state, { payload }) => {
      state.infoCourse = payload;
    },
    setIsModalOpen: (state, { payload }) => {
      state.isModalOpen = payload;
      if (!payload) {
        state.infoCourse = {};
      }
    },
    setIsChecked: (state, { payload }) => {
      state.isChecked = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInfoCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInfoCourse.fulfilled, (state, action) => {
        state.loading = true;
        state.infoCourse = action.payload;
      })
      .addCase(getInfoCourse.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setIsModalOpen, setInfoCourse, setIsChecked } =
  modalFormSlice.actions;

export default modalFormSlice.reducer;
