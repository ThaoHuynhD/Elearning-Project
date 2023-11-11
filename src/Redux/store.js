import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "./spinnerSlice/spinnerSlice";
import userSlice from "./userSlice/userSlice";
import listUserSlice from "./listUserSlice/listUserSlice";
import openModalSlice from "./openModalSlice/openModalSlice";
import courseDetailReducer from "./courseDetailSlice";



export const store = configureStore({
  reducer: { spinnerSlice, userSlice, listUserSlice, openModalSlice, courseDetail: courseDetailReducer, },
});

