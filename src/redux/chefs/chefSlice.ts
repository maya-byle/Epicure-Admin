// TODO: Decide where to fetch the data and whether to separate the slices or keep them combined for all.
import { createSlice } from "@reduxjs/toolkit";
import * as constants from "../../resources/constants.ts";
import * as thunks from "../thunks.ts";

interface IChef {
  collectionData: (typeof constants.CHEF_RESOURCES)[];
  status: string;
}

const initialState: IChef = {
  collectionData: [],
  status: constants.STATUS_CODE.IDLE,
};

const chefSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    // setCurrentChef(state, action) {
    //   state.currentChef = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.fetchData.pending, (state) => {
        state.status = constants.STATUS_CODE.LOADING;
      })
      .addCase(thunks.fetchData.fulfilled, (state, action) => {
        state.status = constants.STATUS_CODE.IDLE;
        state.collectionData = action.payload;
      })

      .addCase(thunks.updateData.fulfilled, (state, action) => {
        state.status = constants.STATUS_CODE.IDLE;
        state.collectionData = state.collectionData.map((chef) => {
          return chef._id !== action.payload._id ? chef : action.payload;
        });
      })
      .addCase(thunks.updateData.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(thunks.addData.fulfilled, (state, action) => {
        state.status = constants.STATUS_CODE.IDLE;
        console.log(action.payload);
        state.collectionData = state.collectionData.concat(action.payload); //TODO: fix
      })
      .addCase(thunks.addData.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(thunks.deleteData.fulfilled, (state, action) => {
        state.status = constants.STATUS_CODE.IDLE;
        console.log(action.payload.dish._id);
        state.collectionData = state.collectionData.filter((chef) => {
          return chef._id !== action.payload.dish._id;
        });
      })
      .addCase(thunks.deleteData.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// export const { setCurrentChef } = chefSlice.actions;

export default chefSlice.reducer;
