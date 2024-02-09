import { createSlice } from "@reduxjs/toolkit";
import { ICollection } from "../../Types/collectionType.ts";

export interface IState {
  currentLocation: string;
  currentType: ICollection | undefined; //TODO: is it possible?
  currentModal: ICollection | undefined;
}

const initialState: IState = {
  currentLocation: "",
  currentType: undefined,
  currentModal: undefined,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    // setLocation(state, action) {
    //   state.currentLocation = action.payload;
    // },
    setModal(state, action) {
      state.currentModal = action.payload;
    },
    closeModal(state) {
      state.currentModal = undefined;
    },
  },
});

export const { setModal, closeModal } = stateSlice.actions;

export default stateSlice.reducer;
