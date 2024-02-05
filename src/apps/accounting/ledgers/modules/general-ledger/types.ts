import { Accounts } from "apps/accounting/purchases/modules/accounts/type";
import { AccountingEntry } from "common/types";

export interface GeneralLedger {
  id: number;
  org_id: number;
  account_id: number;
  account: Accounts;
  tx_no: string;
  ref_tx_no: string;
  date: Date;
  type: AccountingEntry;
  amount?: number;
  particular?: string;
  sub_ledger: string;
  source_id: number;
  created_at: Date;
  debit?: number;
  credit?: number;
}

export type GeneralLedgers = GeneralLedger[];
