import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "./spinnerSlice/spinnerSlice";
import userSlice from "./userSlice/userSlice";

export const store = configureStore({
  reducer: { spinnerSlice, userSlice },
});
