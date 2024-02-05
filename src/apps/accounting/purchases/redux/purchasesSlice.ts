import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyObject } from "common/types";

import {
  accountsFilterDefault,
  paymentsFilterDefault,
  purchaseOrderFilterDefault,
  supplierFilterDefault,
} from "./constants";

export interface TPurchasesState {
  purchaseOrderFilter: AnyObject;
  paymentsFilter: AnyObject;
  selectedReport: "PYB" | "PS" | "PSE" | "AP";
  supplierFilter: typeof supplierFilterDefault;
  accountsFilter: typeof accountsFilterDefault;
}

const initialState: TPurchasesState = {
  purchaseOrderFilter: purchaseOrderFilterDefault,
  paymentsFilter: paymentsFilterDefault,
  supplierFilter: supplierFilterDefault,
  accountsFilter: accountsFilterDefault,
  selectedReport: "PS",
};

export const purchaseSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {
    setPurchasesOrderFilter: (state, action: PayloadAction<AnyObject>) => {
      state.purchaseOrderFilter = {
        ...state.purchaseOrderFilter,
        ...action.payload,
      };
    },
    setPaymentsFilter: (state, action: PayloadAction<AnyObject>) => {
      state.paymentsFilter = {
        ...state.paymentsFilter,
        ...action.payload,
      };
    },
    setSupplierFilter: (state, action: PayloadAction<AnyObject>) => {
      state.supplierFilter = {
        ...state.supplierFilter,
        ...action.payload,
      };
    },
    setAccountsFilter: (state, action: PayloadAction<AnyObject>) => {
      state.accountsFilter = {
        ...state.accountsFilter,
        ...action.payload,
      };
    },
    setSelectedReport: (
      state,
      action: PayloadAction<TPurchasesState["selectedReport"]>,
    ) => {
      state.selectedReport = action.payload;
    },
  },
});

export const {
  setPurchasesOrderFilter,
  setSupplierFilter,
  setAccountsFilter,
  setSelectedReport,
  setPaymentsFilter,
} = purchaseSlice.actions;

export const PurchasesReducer = purchaseSlice.reducer;
