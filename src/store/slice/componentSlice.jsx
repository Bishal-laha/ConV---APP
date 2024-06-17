import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name: "component",
    initialState: {
        isMenu: false,
        isFileComp: false,
        isImageComp: false,
        isTextComp: true,
        isCropDrawerOpen: false,
        isCompressDrawerOpen: false,
        isRemoveBgDrawerOpen: false,
        isConvertFileDrawerOpen: false,
        isCompressFileDrawerOpen: false,
        isMergeFileDrawerOpen: false,
        isSplitFileDrawerOpen: false
    },
    reducers: {
        setIsMenu: (state, action) => {
            state.isMenu = action.payload;
        },
        setIsFileComp: (state, action) => {
            state.isFileComp = action.payload;
        },
        setIsImageComp: (state, action) => {
            state.isImageComp = action.payload;
        },
        setIsTextComp: (state, action) => {
            state.isTextComp = action.payload;
        },
        setIsCropDrawerOpen: (state, action) => {
            state.isCropDrawerOpen = action.payload;
        },
        setIsCompressDrawerOpen: (state, action) => {
            state.isCompressDrawerOpen = action.payload;
        },
        setIsRemoveBgDrawerOpen: (state, action) => {
            state.isRemoveBgDrawerOpen = action.payload;
        },
        setIsConvertFileDrawerOpen: (state, action) => {
            state.isConvertFileDrawerOpen = action.payload;
        },
        setIsCompressFileDrawerOpen: (state, action) => {
            state.isCompressFileDrawerOpen = action.payload;
        },
        setIsMergeFileDrawerOpen: (state, action) => {
            state.isMergeFileDrawerOpen = action.payload;
        },
        setIsSplitFileDrawerOpen: (state, action) => {
            state.isSplitFileDrawerOpen = action.payload;
        }
    }
});

export const { setIsFileComp, setIsImageComp, setIsCompressDrawerOpen, setIsCropDrawerOpen, setIsRemoveBgDrawerOpen, setIsCompressFileDrawerOpen, setIsConvertFileDrawerOpen, setIsMergeFileDrawerOpen, setIsSplitFileDrawerOpen, setIsTextComp, setIsMenu } = fileSlice.actions;
export default fileSlice.reducer;