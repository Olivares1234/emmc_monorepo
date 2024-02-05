import { TRootState } from "redux/store";

export const selectPurchaseOrderFilter = (state: TRootState) =>
  state.purchases.purchaseOrderFilter;

export const selectPaymentsFilter = (state: TRootState) => state.purchases.paymentsFilter;

export const selectSupplierFilter = (state: TRootState) => state.purchases.supplierFilter;

export const selectAccountsFilter = (state: TRootState) => state.purchases.accountsFilter;
export const selectSelectedPurchasesReport = (state: TRootState) =>
  state.purchases.selectedReport;
