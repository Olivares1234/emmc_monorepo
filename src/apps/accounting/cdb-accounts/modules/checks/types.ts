export interface Check {
  id: number;
  checkDate: Date;
  checkNumber: string;
  datePrepared: Date;
  payeesName: string;
  txNo: string;
  voucherDate: Date;
  voucherNumber: string;
}

export type Checks = Check[];
