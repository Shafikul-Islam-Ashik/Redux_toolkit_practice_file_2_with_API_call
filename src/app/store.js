import { configureStore } from "@reduxjs/toolkit";

import studentReducer from "../features/student/studentSlice";

// create store
const store = configureStore({
  reducer: {
    student: studentReducer,
  },
  middleware: (getDefaultMiddleWares) => getDefaultMiddleWares(),
  devTools: true,
});

// export store
export default store;
