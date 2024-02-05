import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyObject } from "common/types";

import {
  approvalFilterDefault,
  collectionFilterDefault,
  customerFilterDefault,
  invoiceFilterDefault,
  logsFilterDefault,
} from "./constants";
export interface TSalesState {
  invoiceFilter: AnyObject;
  collectionFilter: AnyObject;
  selectedReport: "SOA" | "AR" | "SALES" | "SS" | "SSE" | "CR" | "WAR";
  customerFilter: typeof customerFilterDefault;
  logsFilter: typeof logsFilterDefault;
  approvalFilter: typeof approvalFilterDefault;
}

const initialState: TSalesState = {
  invoiceFilter: invoiceFilterDefault,
  collectionFilter: collectionFilterDefault,
  selectedReport: "SOA",
  customerFilter: customerFilterDefault,
  logsFilter: logsFilterDefault,
  approvalFilter: approvalFilterDefault,
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setInvoiceFilter: (state, action: PayloadAction<AnyObject>) => {
      state.invoiceFilter = {
        ...state.invoiceFilter,
        ...action.payload,
      };
    },
    setCollectionFilter: (state, action: PayloadAction<AnyObject>) => {
      state.collectionFilter = {
        ...state.collectionFilter,
        ...action.payload,
      };
    },
    setCustomerFilter: (state, action: PayloadAction<AnyObject>) => {
      state.customerFilter = {
        ...state.customerFilter,
        ...action.payload,
      };
    },
    setSelectedReport: (state, action: PayloadAction<TSalesState["selectedReport"]>) => {
      state.selectedReport = action.payload;
    },
    setLogsFilter: (state, action: PayloadAction<AnyObject>) => {
      state.logsFilter = {
        ...state.logsFilter,
        ...action.payload,
      };
    },
    setApprovalFilter: (state, action: PayloadAction<AnyObject>) => {
      state.approvalFilter = {
        ...state.approvalFilter,
        ...action.payload,
      };
    },
  },
});

export const {
  setInvoiceFilter,
  setCollectionFilter,
  setSelectedReport,
  setCustomerFilter,
  setLogsFilter,
  setApprovalFilter,
} = salesSlice.actions;

export const SalesReducer = salesSlice.reducer;
