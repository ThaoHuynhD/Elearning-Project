import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const openModalSlice = createSlice({
  name: "isOpenModal",
  initialState,
  reducers: {
    setIsModalOpen: (state, { payload }) => {
      state.isModalOpen = payload;
    },
  },
});

export const { setIsModalOpen } = openModalSlice.actions;

export default openModalSlice.reducer;
