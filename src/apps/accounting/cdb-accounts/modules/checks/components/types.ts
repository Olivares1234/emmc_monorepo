export interface CheckForm {
  datePrepared: Date | null;
  checkDate: Date | null;
  voucherDate: Date | null;
  voucherNumber: string;
  payeesName: string;
  items: CheckItemForm[];
}

export interface CheckItemForm {
  type: string;
  accountId: number | null;
  amount: number;
  explanation: string;
  subTotal: number;
  total: number;
  department: string;
}
