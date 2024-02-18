import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./tables/tableSlice.ts";
import loginReducer from "./tables/loginSlice.ts";

const store = configureStore({
  reducer: {
    collection: tableReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
