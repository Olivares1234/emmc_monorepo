import { configureStore } from "@reduxjs/toolkit";
import { CdbReducer, cdbSlice } from "apps/accounting/cdb-accounts/redux/cdbSlice";
import { LedgerReducer, ledgerSlice } from "apps/accounting/ledgers/redux/ledgerSlice";
import {
  purchaseSlice,
  PurchasesReducer,
} from "apps/accounting/purchases/redux/purchasesSlice";
import { SalesReducer, salesSlice } from "apps/accounting/sales/redux/salesSlice";
import { AuthReducer, authSlice } from "apps/portal/auth/redux/authSlice";
import { LayoutReducer, layoutSlice } from "common/components/layout/redux/layoutSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: AuthReducer,
    [layoutSlice.name]: LayoutReducer,
    [salesSlice.name]: SalesReducer,
    [purchaseSlice.name]: PurchasesReducer,
    [cdbSlice.name]: CdbReducer,
    [ledgerSlice.name]: LedgerReducer,
  },
  devTools: !import.meta.env.PROD,
});

export type TRootState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;

export default store;
