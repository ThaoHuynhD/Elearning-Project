import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  timKiemNguoiDung,
  capNhatThongTinNguoiDung,
  xoaNguoiDung,
} from "../../Services/api";

const initialState = {
  listUser: [],
  loading: false,
};

export const fetchList = createAsyncThunk(
  "listUser/fetchListUser",
  async (data, { dispatch }) => {
    try {
      const res = await timKiemNguoiDung();
      if (res.status === 200) {
        console.log("🚀 ~ file: listUserSlice.js:14 ~ res:", res);
        dispatch(setListUser(res.data));
      }
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk(
  "listUser/updateUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await capNhatThongTinNguoiDung(userData);
      if (response.status === 200) {
        console.log("response:", response);
        dispatch(fetchList());
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      console.log("Error updating user:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "listUser/deleteUser",
  async (taiKhoan, { dispatch, rejectWithValue }) => {
    try {
      const response = await xoaNguoiDung(taiKhoan);
      if (response.status === 200) {
        dispatch(fetchList());
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchUser = createAsyncThunk(
  "listUser/searchUser",
  async (taiKhoan, {rejectWithValue}) => {
    try {
      const response = await timKiemNguoiDung(taiKhoan);
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    }
    catch (error) {
      console.log("error:", error)
      return rejectWithValue(error.response.data);
    }
  }
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
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUserIndex = state.listUser.findIndex(
          (user) => user.id === action.payload.id
        );
        if (updateUser !== -1) {
          state.listUser[updatedUserIndex] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.error("Update failed:", action.payload);
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading=true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading=false;
      })
      .addCase(deleteUser.rejected, (state, action)=> {
        state.loading=false;
        state.error=action.payload || "Failed to delete user";
      })

      .addCase(searchUser.fulfilled, (state, action)=>{
        state.searchResults = action.payload;
        // clear previous search-related errors
        state.searchError = null;
      })
      .addCase(searchUser.rejected, (state, action)=>{
        state.searchError = action.error.message || "Failed to search users";
        // clear previous search results 
        state.searchResults = null;
      })
  },
});

export const { setListUser } = listUserSlice.actions;

export default listUserSlice.reducer;
