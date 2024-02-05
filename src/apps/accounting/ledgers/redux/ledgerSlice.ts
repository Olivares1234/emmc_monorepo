import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyObject } from "common/types";

import { generalLedgerDefaultFilterValue, journalDefaultFilterValue } from "./constants";
export interface LedgerState {
  generalLedgerFilter: typeof generalLedgerDefaultFilterValue;
  journalLedgerFilter: typeof journalDefaultFilterValue;
}
const initialState: LedgerState = {
  generalLedgerFilter: generalLedgerDefaultFilterValue,
  journalLedgerFilter: journalDefaultFilterValue,
};

export const ledgerSlice = createSlice({
  name: "ledger",
  initialState,
  reducers: {
    setGeneralLedgerFilter: (state, action: PayloadAction<AnyObject>) => {
      state.generalLedgerFilter = {
        ...state.generalLedgerFilter,
        ...action.payload,
      };
    },
    setJournalFilter: (state, action: PayloadAction<AnyObject>) => {
      state.journalLedgerFilter = {
        ...state.journalLedgerFilter,
        ...action.payload,
      };
    },
  },
});

export const { setGeneralLedgerFilter, setJournalFilter } = ledgerSlice.actions;

export const LedgerReducer = ledgerSlice.reducer;
