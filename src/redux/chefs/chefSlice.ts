// TODO: Decide where to fetch the data and whether to separate the slices or keep them combined for all.
import { createSlice } from "@reduxjs/toolkit";
import { CHEF_RESOURCES } from "../../resources/constants.ts";
import * as thunks from "../thunks.ts";

interface chefState {
  currentChefsData: (typeof CHEF_RESOURCES)[];
  status?: string;
}

const initialState: chefState = {
  currentChefsData: [],
  status: "loading",
};

const chefSlice = createSlice({
  name: "chef",
  initialState,
  reducers: {
    // setCurrentChef(state, action) {
    //   state.currentChef = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(thunks.fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentChefsData = action.payload;
      })

      .addCase(thunks.updateData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(thunks.updateData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentChefsData = state.currentChefsData.map((chef) => {
          return chef._id !== action.payload._id ? chef : action.payload;
        });
      })

      .addCase(thunks.addData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(thunks.addData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.currentChefsData = state.currentChefsData.concat(action.payload); //TODO: why isnt it working and how to improve
      })

      .addCase(thunks.deleteData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(thunks.deleteData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload.dish._id);
        state.currentChefsData = state.currentChefsData.filter((chef) => {
          return chef._id !== action.payload.dish._id;
        });
      });
  },
});

// export const { setCurrentChef } = chefSlice.actions;

export default chefSlice.reducer;
