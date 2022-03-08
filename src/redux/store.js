import { configureStore } from "@reduxjs/toolkit";
import sortReducer from "./sort";
export default configureStore({
  reducer: {
    sort: sortReducer,
  },
});
