import { configureStore } from "@reduxjs/toolkit";
import busReducer from "./store/reducers/allbuses";

export default configureStore({
    reducer: {
        bus: busReducer
    }
});
