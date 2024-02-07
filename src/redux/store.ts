import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import reducer from "./reducers.ts";

interface State {
  data: any;
}

const initialState: State[] = []; //TODO: fetch data using thunk

const middleware = [thunk];

// Create the Redux store using configureStore
const store = configureStore({
  reducer: reducer,
  //   middleware: [thunk],
  preloadedState: initialState,
});

export default store;
