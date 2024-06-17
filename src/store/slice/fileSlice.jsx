import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name: "file",
    initialState: {
        isFileUrl: false,
        fileUrl: [],
        fileMetaData: []
    },
    reducers: {
        setIsFileUrl: (state, action) => {
            state.isFileUrl = action.payload;
        },
        setFileUrl: (state, action) => {
            state.fileUrl.push(action.payload);
        },
        setFileMetaData: (state, action) => {
            state.fileMetaData.push(action.payload);
        },
        clearFileMetaData: (state) => {
            state.fileMetaData = [];
        },
        clearFileUrl: (state) => {
            state.fileUrl = [];
        }
    }
});

export const { setFileUrl, setFileMetaData, setIsFileUrl, clearFileMetaData, clearFileUrl } = fileSlice.actions;
export default fileSlice.reducer;