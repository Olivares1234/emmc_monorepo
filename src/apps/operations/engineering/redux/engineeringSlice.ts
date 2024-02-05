import { createSlice } from "@reduxjs/toolkit";

export type EngineeringSTate = Record<string, any>;

const initialState: EngineeringSTate = {};

export const salesSlice = createSlice({
  name: "engineering",
  initialState,
  reducers: {},
});

// export const { setApprovalFilter } = salesSlice.actions;

export const SalesReducer = salesSlice.reducer;
