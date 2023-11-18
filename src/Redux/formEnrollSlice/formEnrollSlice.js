import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taiKhoan: null,
  listKhoaHocChuaGhiDanh: [],
  listKhoaHocChoXetDuyet: [],
  listKhoaHocDaXacThuc: [],
};

const formEnrollSlice = createSlice({
  name: "enrollSlice",
  initialState,
  reducers: {
    setTaiKhoan: (state, { payload }) => {
      state.taiKhoan = payload;
    },
    setListKhoaHocChuaGhiDanh: (state, { payload }) => {
      state.listKhoaHocChuaGhiDanh = payload;
    },
    setListKhoaHocChoXetDuyet: (state, { payload }) => {
      state.listKhoaHocChoXetDuyet = payload;
    },
    setListKhoaHocDaXacThuc: (state, { payload }) => {
      state.listKhoaHocDaXacThuc = payload;
    },
  },
});

export const {
  setTaiKhoan,
  setIsOpenEnrollPopup,
  setListKhoaHocChuaGhiDanh,
  setListKhoaHocChoXetDuyet,
  setListKhoaHocDaXacThuc,
} = formEnrollSlice.actions;

export default formEnrollSlice.reducer;
