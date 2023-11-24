import { createSlice } from "@reduxjs/toolkit";
import { categoriesLocalStorage } from "../../Services/localServices";

const initialState = {
  listCategories: categoriesLocalStorage?.get(),
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setListCategories: (state, action) => {
      state.listCategories = action.payload;
    },
  },
});

export const { setListCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
