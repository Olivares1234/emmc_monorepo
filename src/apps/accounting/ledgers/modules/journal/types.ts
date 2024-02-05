import { Accounts } from "apps/accounting/purchases/modules/accounts/type";

export interface Journal {
  account_id: number;
  tx_no: string;
  date: Date;
  type: string;
  account: Accounts;
  amount?: number;
  particular?: string;
  debit?: number;
  credit?: number;
}

export type Journals = Journal[];
