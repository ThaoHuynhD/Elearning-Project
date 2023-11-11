import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const modalFormSlice = createSlice({
  name: "modalAddForm",
  initialState,
  reducers: {
    setIsModalOpen: (state, { payload }) => {
      state.isModalOpen = payload;
    },
  },
});

export const { setIsModalOpen } = modalFormSlice.actions;

export default modalFormSlice.reducer;
