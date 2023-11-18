import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "./spinnerSlice/spinnerSlice";
import userSlice from "./userSlice/userSlice";
import listUserSlice from "./listUserSlice/listUserSlice";
import formEnrollSlice from "./formEnrollSlice/formEnrollSlice";
import popupEditModal from "./popupEditModal/popupEditModal";

export const store = configureStore({
  reducer: {
    spinnerSlice,
    userSlice,
    listUserSlice,
    formEnrollSlice,
    popupEditModal,
  },
});
