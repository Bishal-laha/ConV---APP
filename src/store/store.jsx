import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./slice/imageSlice";
import fileReducer from "./slice/fileSlice";
import componentReducer from "./slice/componentSlice";

const store = configureStore({
    reducer: {
        img: imageReducer,
        file: fileReducer,
        component: componentReducer
    }
});

export default store;