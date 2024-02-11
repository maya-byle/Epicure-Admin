import { createSlice } from "@reduxjs/toolkit";
import * as constants from "../../resources/constants.ts";
import * as thunks from "../tables/tableThunks.ts";
import { ICollection } from "../../Types/collectionType.ts";

interface ITable {
  collectionData: (typeof constants.CHEF_RESOURCES)[];
  status: string;
  currentModal: ICollection | undefined;
}

const initialState: ITable = {
  collectionData: [],
  status: constants.STATUS_CODE.IDLE,
  currentModal: undefined,
};

const tableSlice = createSlice({
  name: "tableSlice",
  initialState,
  reducers: {
    setModal(state, action) {
      state.currentModal = action.payload;
    },
    closeModal(state) {
      state.currentModal = undefined;
    },
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
          return chef._id !== action.payload.data_id ? chef : action.payload;
        });
      })
      .addCase(thunks.updateData.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(thunks.addData.fulfilled, (state, action) => {
        state.status = constants.STATUS_CODE.IDLE;
        state.collectionData = state.collectionData.concat(action.payload);
      })
      .addCase(thunks.addData.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(thunks.deleteData.fulfilled, (state, action) => {
        state.status = constants.STATUS_CODE.IDLE;
        state.collectionData = state.collectionData.filter((data) => {
          return data._id !== action.payload._id;
        });
      })
      .addCase(thunks.deleteData.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const { setModal, closeModal } = tableSlice.actions;

export default tableSlice.reducer;
