import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import chefReducer from "./chefs/chefSlice.ts";

const store = configureStore({
  reducer: {
    chef: chefReducer,
    //     dish: dishReducer,
    //     restaurant: restaurantReducer,
  },
  //   middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
