import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { layDanhSachNguoiDung } from "../../Services/api";

const initialState = {
  listUser: [],
  loading: false,
};

export const fetchList = createAsyncThunk(
  "listUser/fetchListUser",
  async (data, { dispatch }) => {
    try {
      const res = await layDanhSachNguoiDung();
      if (res.status === 200) {
        console.log("🚀 ~ file: listUserSlice.js:14 ~ res:", res);
        dispatch(setListUser(res.data));
      }
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

const listUserSlice = createSlice({
  name: "listUser",
  initialState,
  reducers: {
    setListUser: (state, { payload }) => {
      state.listUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.loading = true;
        state.listUser = action.payload;
      })
      .addCase(fetchList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setListUser } = listUserSlice.actions;

export default listUserSlice.reducer;