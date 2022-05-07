import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";


const ApiSlice = createSlice({
    name: "api",
    initialState: [],
    reducers: {
        setlistArtist: (state, action) => {
            let id = uuid();
            return [...state, { id: id, data: action.payload }];
        },
        getlistArtist: (state, action) => {
            return [...state];
        }
    }
})

export const { setlistArtist, getlistArtist } = ApiSlice.actions;
export const selectListArtist = (state) => state.api;
export const filteredArtistSelector = (state) => state.api.filter((elm) => elm.data.type == "Artist");
export default ApiSlice.reducer;