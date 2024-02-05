import { TableFormatType } from "common/components/table/types";
import * as yup from "yup";

export const collectionDefaultValue = {
  invoice_ids: [],
  official_receipt_no: "",
  customer: "",
  ar_no: "",
  collection_date: null,
  withholding_tax: "0",
  check_no: "",
  bank_name: "",
  bank_charge: 0,
  payment_method: "",
  meta: {},
};

export const collectionSchema = yup.object().shape({
  invoice_ids: yup.array(yup.number()).min(1).required().label("Invoices"),
  collection_date: yup
    .date()
    .required()
    .typeError("Collection Date is required")
    .label("Collection Date"),
  withholding_tax: yup.number().min(0).max(2).required().label("Withholding Tax"),
  note_type: yup.string().nullable().label("Note Type"),
  check_no: yup
    .string()
    .when("payment_method", ([paymentMethod], schema) => {
      if (paymentMethod === "Check") {
        return schema.required();
      }
      return schema;
    })
    .label("Check No"),
  bank_name: yup
    .string()
    .when("payment_method", ([paymentMethod], schema) => {
      if (paymentMethod === "Bank") {
        return schema.required();
      }
      return schema;
    })
    .label("Bank name"),
  bank_charge: yup
    .number()
    .when("payment_method", ([paymentMethod], schema) => {
      if (paymentMethod === "Bank") {
        return schema.required();
      }
      return schema;
    })
    .label("Bank name"),
  ar_no: yup.string().label("Acknowledgement No."),
  official_receipt_no: yup.string().required().label("Official receipt No."),
  payment_method: yup.string().required().label("Payment method"),
});

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
    label: "Invoice ascending",
    value: "invoice_no:asc",
  },
  {
    label: "Invoice descending",
    value: "invoice_no:desc",
  },
];

export const totalTableFormat: TableFormatType[] = [
  {
    label: "Invoice no",
    colKey: "invoice_no",
  },
  {
    label: "Total Amount",
    colKey: "totals",
    customRender: (val) => val.totals.toFixed(4),
  },
];
