export interface Collection {
  id: number;
  official_receipt_no: string;
  collection_date: string;
  ar_no: string;
  bank_name: string;
  check_no: string;
  created_at: string;
  payment_method: string;
  withholding_tax: number;
  _count: {
    invoices: number;
  };
  total: number;
}
