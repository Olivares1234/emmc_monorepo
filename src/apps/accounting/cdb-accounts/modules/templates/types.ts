export interface TemplateSpecs {
  x: number;
  y: number;
  fieldKeys: TemplateFieldkeys;
}

export interface Template {
  id?: number;
  name: string;
  fontSize: string;
  fontStyle: string;
  width: number;
  height: number;
  specs: TemplateSpecs[];
}

export enum TemplateFieldkeys {
  Date_prepared = "Date_prepared",
  Check_date = "Check_date",
  Check_number = "Check_number",
  Payees_name = "Payees_name",
  Department = "Department",
  Accounts = "Accounts",
  Amount = "Amount",
  Amount_in_words = "Amount_in_words",
  EWT = "EWT",
  Voucher_date = "Voucher_date",
  Voucher_no = "Voucher_no",
  Explanation = "Explanation",
  Total_amount = "Total_amount",
}

export enum TemplateFieldColumnkeys {
  Date_prepared = "date_prepared",
  Check_date = "check_date",
  Check_number = "check_number",
  Payees_name = "payees_name",
  Department = "department",
  Accounts = "accounts.title",
  Amount = "amount",
  EWT = "ewt",
  Voucher_date = "voucher_date",
  Voucher_no = "voucher_number",
  Explanation = "explanation",
  Amount_in_words = "amount_in_words",
  Total_amount = "total",
}
