import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imageUrl: "",
    validateHelper: {
        isValid: true,
        message: "",
    },
    newSkU: ""
};

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        changeImage(state, action) {
            state.imageUrl = action.payload.imageUrl;
        },
        changeInvalidate(state, action) {
            state.validateHelper = action.payload.validateHelper;
        },
        changeNewSku(state, action) {
            state.newSkU = action.payload;
        }
    },
});

export const { changeImage, changeInvalidate,changeNewSku } = productSlice.actions;
export default productSlice.reducer;
