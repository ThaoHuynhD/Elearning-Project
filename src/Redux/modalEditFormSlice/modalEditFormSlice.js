import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { layThongTinKhoaHoc } from "../../Services/api";
import { fetchList } from "../listUserSlice/listUserSlice";

const initialState = {
  isModalEditOpen: false,
  infoCourse: {},
  loading: false,
};
export const getInfoCourse = createAsyncThunk(
  "getInfo",
  async (maKhoaHoc, { dispatch }) => {
    try {
      let res = await layThongTinKhoaHoc(maKhoaHoc);
      if (res.status === 200) {
        dispatch(setInfoCourse(res.data));
        dispatch(setIsModalEditOpen(true));
        return res.data;
      }
    } catch (error) {
      throw error;
    }
  },
);
const modalEditFormSlice = createSlice({
  name: "modalEditForm",
  initialState,
  reducers: {
    setInfoCourse: (state, { payload }) => {
      state.infoCourse = payload;
    },
    setIsModalEditOpen: (state, { payload }) => {
      state.isModalEditOpen = payload;
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
      .addCase(fetchList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setInfoCourse, setIsModalEditOpen } = modalEditFormSlice.actions;

export default modalEditFormSlice.reducer;
