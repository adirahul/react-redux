import { configureStore } from "@reduxjs/toolkit";
import movieDBReducer from "../feature/movieDB/movieDBSlice"

export const store = configureStore({
    reducer: movieDBReducer,
});