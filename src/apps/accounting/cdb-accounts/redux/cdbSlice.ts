import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyObject } from "common/types";

import { checkVoucherFilterDefault } from "./constants";
export interface TCdbState {
  checkVoucherFilter: typeof checkVoucherFilterDefault;
}

const initialState: TCdbState = {
  checkVoucherFilter: checkVoucherFilterDefault,
};

export const cdbSlice = createSlice({
  name: "cdb",
  initialState,
  reducers: {
    setCheckVoucherFilter: (state, action: PayloadAction<AnyObject>) => {
      state.checkVoucherFilter = {
        ...state.checkVoucherFilter,
        ...action.payload,
      };
    },
  },
});

export const { setCheckVoucherFilter } = cdbSlice.actions;

export const CdbReducer = cdbSlice.reducer;
