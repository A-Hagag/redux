import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducers/counterSlice";
import postSlice from "../reducers/postSlice";
export default configureStore({
  reducer: {
    counterData: counterSlice,
    postsData: postSlice,
  },
});
