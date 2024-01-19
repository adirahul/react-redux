import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favs: [{
        id: '3111',
        rating: 4,
    }],
};
const movieDBSlice = createSlice({
    name: "movieDB",
    initialState,
    reducers: {
        addToFav: (state, action) => {
            const item = {
                id: action.payload,
                rating: 5,
            }
            state.favs.push(item);
        },
        // addRating: (state, action) => {
        //     const item = {
        //         id: action.payload,
        //         rating: action.payload,
        //     }
        //     state.favs.push(item);
        // }
    }
})

export const { addToFav} = movieDBSlice.actions;
export default movieDBSlice.reducer;