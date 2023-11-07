import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
};

const spinnerSlice = createSlice({
    name: "spinnerSlice",
    initialState,
    reducers: {
        handleLoadingOn: (state, action) => {
            state.isLoading = true;
        },
        handleLoadingOff: (state, action) => {
            state.isLoading = false;
        },
    },
});

export const { handleLoadingOn, handleLoadingOff } = spinnerSlice.actions;

export default spinnerSlice.reducer;
