import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "./spinnerSlice/spinnerSlice";
import userSlice from "./userSlice/userSlice";
import courseDetailReducer from "./courseDetailSlice"

export const store = configureStore({
  reducer: { spinnerSlice, userSlice },
  courseDetail: courseDetailReducer,
});
