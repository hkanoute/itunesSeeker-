import { configureStore, combineReducers } from "@reduxjs/toolkit";
import apiReducer from "./component/ApiSlice";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";

const reducers = combineReducers({ api: apiReducer });
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});