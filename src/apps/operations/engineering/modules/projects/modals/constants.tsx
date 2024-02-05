export const projectDefaultValue = {
  customerId: "",
  name: "",
};

export const invoiceDefaultValue = {
  invoice_no: "",
  delivery_date: null,
  currency: "PHP",
  debit_note_no: "",
  sales_type: "",
  note_type: "",
  note: "",
  customer: "",
  items: [],
};

export const invoiceItemDefaultValue = {
  dr_no: "",
  purchase_order_no: "",
  particular: "",
  part_no: "",
  quantity: "",
  unit_price: "",
  remarks: "",
  total: 0,
};

export const collectionDefaultValue = {
  invoice_ids: [],
  official_receipt_no: "",
  ar_no: "",
  collection_date: null,
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
  Not_Collected: {
    dark: "bg-gray-800",
    light: "bg-gray-500",
  },
  Collected: {
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
    label: "Invoice asc",
    value: "invoice_no:asc",
  },
  {
    label: "Invoice desc",
    value: "invoice_no:desc",
  },
  {
    label: "Delivery date desc",
    value: "delivery_date:desc",
  },
  {
    label: "Delivery date Asc",
    value: "delivery_date:asc",
  },
];

export const statusOptions = [
  { value: "Collected", label: "Collected" },
  { value: "Not_Collected", label: "Not Collected" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Revised", label: "Revised" },
];
