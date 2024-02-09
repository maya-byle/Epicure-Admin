import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import tableReducer from "./tables/tableSlice.ts";
import stateSlice from "./states/stateSlice.ts";

const store = configureStore({
  reducer: {
    collection: tableReducer,
    states: stateSlice, //TODO: change name
  },
  //   middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
