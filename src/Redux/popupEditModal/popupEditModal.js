import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoCourse: null,
};

const popupEditModal = createSlice({
  name: "popupEditModal",
  initialState,
  reducers: {
    setInfoCourse: (state, { payload }) => {
      state.infoCourse = payload;
    },
  },
});

export const { setInfoCourse } = popupEditModal.actions;

export default popupEditModal.reducer;
