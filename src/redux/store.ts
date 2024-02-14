import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./tables/tableSlice.ts";

const store = configureStore({
  reducer: {
    collection: tableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
