import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
    name: "img",
    initialState: {
        isImageUrl: false,
        imageUrl: null,
        imageMetaData: null
    },
    reducers: {
        setIsImageUrl: (state, action) => {
            state.isImageUrl = action.payload;
        },
        setImageUrl: (state, action) => {
            state.imageUrl = action.payload;
        },
        setImageMetaData: (state, action) => {
            state.imageMetaData = action.payload;
        },
        clearImageMetaData: (state) => {
            state.imageMetaData = null;
        },
        clearImageUrl: (state) => {
            state.imageUrl = null;
        }
    }
});

export const { setImageUrl, setIsImageUrl, setImageMetaData, clearImageMetaData, clearImageUrl } = imageSlice.actions;
export default imageSlice.reducer;