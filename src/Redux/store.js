import { configureStore } from "@reduxjs/toolkit";
import spinnerSlice from "./spinnerSlice/spinnerSlice";

export const store = configureStore({
    reducer: { spinnerSlice },
});
