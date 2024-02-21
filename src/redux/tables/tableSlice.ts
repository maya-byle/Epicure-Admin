import { createSlice } from "@reduxjs/toolkit";
import * as constants from "../../resources/constants.ts";
import * as thunks from "../tables/tableThunks.ts";
import { ICollection } from "../../Types/collectionType.ts";

interface ITable {
  collectionData: ICollection[];
  filterdData: ICollection[];
  status: string;
  isModal: ICollection | undefined;
  currDocument: string | undefined;
  codeStatus: string | undefined;
  chefs: ICollection[];
}

const initialState: ITable = {
  collectionData: [],
  filterdData: [],
  status: constants.STATUS_CODE.IDLE,
  isModal: undefined,
  currDocument: undefined,
  codeStatus: undefined,
  chefs: [],
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
    filterData(state, action) {
      const filtered = state.collectionData.filter((item) =>
        item.name.toLowerCase().startsWith(action.payload.toLowerCase())
      );
      state.filterdData = filtered;
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
        state.filterdData = action.payload;
      })
      .addCase(thunks.fetchData.rejected, (state, action) => {
        state.status = constants.STATUS_CODE.REJECTED;
        state.codeStatus = action.error.message;
      })

      .addCase(thunks.updateData.fulfilled, (state, action) => {
        state.status = constants.STATUS_CODE.IDLE;
        state.collectionData = state.collectionData.map((chef) => {
          return chef._id !== action.payload._id ? chef : action.payload;
        });
      })
      .addCase(thunks.updateData.rejected, (state, action) => {
        state.status = constants.STATUS_CODE.REJECTED;
        state.codeStatus = action.error.message;
      })

      .addCase(thunks.addData.fulfilled, (state, action) => {
        state.status = constants.STATUS_CODE.IDLE;
        state.collectionData = state.collectionData.concat(action.payload);
      })
      .addCase(thunks.addData.rejected, (state, action) => {
        state.status = constants.STATUS_CODE.REJECTED;
        state.codeStatus = action.error.message;
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
        state.codeStatus = action.error.message;
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
        state.codeStatus = action.error.message;
      })

      .addCase(thunks.getChefsList.fulfilled, (state, action) => {
        state.status = constants.STATUS_CODE.IDLE;
        state.chefs = action.payload;
      });
  },
});

export const { setModal, setDocument, filterData } = tableSlice.actions;

export default tableSlice.reducer;
