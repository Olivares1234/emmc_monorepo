import { TRootState } from "redux/store";

export const selectInvoiceFilter = (state: TRootState) => state.sales.invoiceFilter;
export const selectCollectionFilter = (state: TRootState) => state.sales.collectionFilter;

export const selectedSelectedReports = (state: TRootState) => state.sales.selectedReport;

export const selectCustomerFilter = (state: TRootState) => state.sales.customerFilter;

export const selectLogsFilter = (state: TRootState) => state.sales.logsFilter;
export const selectApprovalFilter = (state: TRootState) => state.sales.logsFilter;

export const selectProjectsFilter = (state: TRootState) => state.sales.invoiceFilter;
