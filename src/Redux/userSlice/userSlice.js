import { createSlice } from "@reduxjs/toolkit";
import { localServices } from "../../Services/localServices";

const initialState = {
    info: localServices?.get(),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setInfo: (state, { payload }) => {
            state.info = payload;
        },
    },
});

export const { setInfo } = userSlice.actions;

export default userSlice.reducer;