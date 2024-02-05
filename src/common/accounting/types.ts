import { AccountingEntry } from "common/types";

export type LedgerEntries = Array<{
  amount: number;
  account_id: number;
  account: string;
  particular: string;
  type: AccountingEntry;
  debit?: number;
  credit?: number;
}>;
