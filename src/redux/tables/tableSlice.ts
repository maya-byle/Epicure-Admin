import { createSlice } from "@reduxjs/toolkit";
import * as constants from "../../resources/constants.ts";
import * as thunks from "../tables/tableThunks.ts";
import { ICollection } from "../../Types/collectionType.ts";
import { redirect } from "react-router";

interface ITable {
  collectionData: ICollection[];
  status: string;
  isModal: ICollection | undefined;
  currDocument: string | undefined;
  errorStatus: string | undefined;
}

const initialState: ITable = {
  collectionData: [],
  status: constants.STATUS_CODE.IDLE,
  isModal: undefined,
  currDocument: undefined,
  errorStatus: undefined,
};

const tableSlice = createSlice({
  name: "tableSlice",
  initialState,
  reducers: {
    setModal(state, action) {
      state.isModal = action.payload;
    },
    setDocument(state, action) {
      state.currDocument = action.payload;
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
      .addCase(thunks.fetchData.rejected, (state, action) => {
        state.status = constants.STATUS_CODE.REJECTED;
        state.errorStatus = action.error.message;
      })

      .addCase(thunks.updateData.fulfilled, (state, action) => {
        state.status = constants.STATUS_CODE.IDLE;
        state.collectionData = state.collectionData.map((chef) => {
          return chef._id !== action.payload._id ? chef : action.payload;
        });
      })
      .addCase(thunks.updateData.rejected, (state, action) => {
        state.status = constants.STATUS_CODE.REJECTED;
        state.errorStatus = action.error.message;
      })

      .addCase(thunks.addData.fulfilled, (state, action) => {
        state.status = constants.STATUS_CODE.IDLE;
        state.collectionData = state.collectionData.concat(action.payload);
      })
      .addCase(thunks.addData.rejected, (state, action) => {
        state.status = constants.STATUS_CODE.REJECTED;
        state.errorStatus = action.error.message;
      })

      .addCase(thunks.deleteData.fulfilled, (state, action) => {
        state.status = constants.STATUS_CODE.IDLE;
        state.collectionData = state.collectionData.map((data) => {
          if (data._id !== action.payload._id) return data;
          else return { ...data, status: "deleted" };
        });
      })
      .addCase(thunks.deleteData.rejected, (state, action) => {
        state.status = constants.STATUS_CODE.REJECTED;
        state.errorStatus = action.error.message;
      })

      .addCase(thunks.login.pending, (state, action) => {
        state.status = constants.STATUS_CODE.LOADING;
      })
      .addCase(thunks.login.fulfilled, (state, action) => {
        state.status = constants.STATUS_CODE.IDLE;
        const token = action.payload.token;
        sessionStorage.setItem("userToken", token);
      })
      .addCase(thunks.login.rejected, (state, action) => {
        state.status = constants.STATUS_CODE.REJECTED;
        state.errorStatus = action.error.message;
      });
  },
});

export const { setModal, setDocument } = tableSlice.actions;

export default tableSlice.reducer;
