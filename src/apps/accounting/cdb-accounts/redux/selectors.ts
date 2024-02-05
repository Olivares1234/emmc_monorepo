import { TRootState } from "redux/store";

export const selectCdbVoucherFilter = (state: TRootState) => state.cdb.checkVoucherFilter;
