export const paymentsDefaultValue = {
  invoice_ids: [],
  official_receipt_no: "",
  supplier: undefined,
  ar_no: "",
  payment_date: null,
  withholding_tax: "0",
  check_no: "",
  bank_name: "",
  payment_method: "",
  meta: {},
};

export const paymentMethodOpt = [
  {
    label: "Bank",
    value: "Bank",
  },
  {
    label: "Cash",
    value: "Cash",
  },
  {
    label: "Check",
    value: "Check",
  },
];

export const withholdingTaxOpt = [
  {
    label: "0",
    value: "0",
  },
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
];

export const sortOptions = [
  {
    label: "Invoice ascending",
    value: "invoice_no:asc",
  },
  {
    label: "Invoice descending",
    value: "invoice_no:desc",
  },
];
