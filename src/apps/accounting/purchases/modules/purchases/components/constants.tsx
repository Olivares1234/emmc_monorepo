export const purchaseDefaultValue = {
  accounts_id: "",
  invoice_no: "",
  supplier_id: "",
  currency: "PHP",
  dr_no: "",
  sales_type: "",
  invoice_date: null,
  items: [],
  classifications: "",
  status: "",
};

export const purchaseItemDefaultValue = {
  purchase_order_no: "",
  particular: "",
  dr_no: "",
  importation_amount: "",
  part_no: "",
  purchase_request_no: "",
  quantity: "",
  unit_price: "",
  remarks: "",
  total: 0,
};

export const paymentsDefaultValue = {
  purchase_order_id: [],
  official_receipt_no: "",
  part_no: "",
  ar_no: "",
  collection_date: null,
  withholding_tax: "0",
  check_no: "",
  bank_name: "",
  payment_method: "",
  meta: {},
};

export const classificationOptions = [
  { value: "Goods", label: "Goods" },
  { value: "Services", label: "Services" },
  { value: "Import", label: "Import" },
];

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

export const currencyOpt = [
  {
    label: "PHP",
    value: "PHP",
  },
  {
    label: "USD",
    value: "USD",
  },
];
export const salesTypeOpt = [
  {
    label: "Zero rated",
    value: "zero_rated",
  },
  {
    label: "Vatable",
    value: "vatable",
  },
  {
    label: "Exempt",
    value: "exempt",
  },
];

export const noteOpt = [
  {
    label: "Debit",
    value: "Debit",
  },
  {
    label: "Credit",
    value: "Credit",
  },
];

export const itemStatusColors = {
  Debit: {
    dark: "bg-green-800",
    light: "bg-green-500",
  },
  Credit: {
    dark: "bg-red-800",
    light: "bg-red-500",
  },
  None: {
    dark: "bg-gray-800",
    light: "bg-gray-500",
  },
};

export const statusColors = {
  Not_Paid: {
    dark: "bg-gray-800",
    light: "bg-gray-500",
  },
  Paid: {
    dark: "bg-green-800",
    light: "bg-green-500",
  },
  Cancelled: {
    dark: "bg-red-800",
    light: "bg-red-500",
  },
  Revised: {
    dark: "bg-yellow-700",
    light: "bg-yellow-500",
  },
  Default: {
    dark: "bg-green-800",
    light: "bg-green-500",
  },
};

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

export const statusOptions = [
  { value: "Paid", label: "Paid" },
  { value: "Not_Paid", label: "Not Paid" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Revised", label: "Revised" },
];
