import { TRootState } from "redux/store";

export const selectGeneralLedgerFilter = (state: TRootState) =>
  state.ledger.generalLedgerFilter;

export const selectJournalFilter = (state: TRootState) =>
  state.ledger.journalLedgerFilter;
