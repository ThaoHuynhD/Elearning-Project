import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "./spinnerSlice/spinnerSlice";
import userSlice from "./userSlice/userSlice";
import listUserSlice from "./listUserSlice/listUserSlice";
import modalFormSlice from "./modalFormSlice/modalFormSlice";

export const store = configureStore({
  reducer: { spinnerSlice, userSlice, listUserSlice, modalFormSlice },
});
