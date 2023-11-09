import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "./spinnerSlice/spinnerSlice";
import userSlice from "./userSlice/userSlice";
import listUserSlice from "./listUserSlice/listUserSlice";
import openModalSlice from "./openModalSlice/openModalSlice";

export const store = configureStore({
  reducer: { spinnerSlice, userSlice, listUserSlice, openModalSlice },
});
