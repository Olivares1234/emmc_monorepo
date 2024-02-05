import dayjs from "dayjs";
import * as yup from "yup";

const alphanumericRegex = /^[a-zA-Z0-9_ -]+$/;

export const projectSchema = yup.object().shape({
  customerId: yup.string().required(),
  name: yup.string().required(),
});

export const collectionSchema = yup.object().shape({
  invoice_ids: yup.array(yup.number()).min(1).required().label("Invoices"),
  collection_date: yup
    .date()
    .max(dayjs().add(1, "day"))
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
  ar_no: yup.string().label("Acknowledgement No."),
  official_receipt_no: yup.string().required().label("Official receipt No."),
  payment_method: yup.string().required().label("Payment method"),
});

export const schema = yup.object().shape({
  invoice_no: yup
    .string()
    .matches(
      alphanumericRegex,
      "Only alphanumeric characters, underscore, and dash are allowed",
    )
    .required()
    .label("Invoice No"),
  delivery_date: yup
    .date()
    .max(new Date())
    .required()
    .typeError("Invalid Date")
    .label("Delivery Date"),
  currency: yup.string().required().label("Currency"),
  note_type: yup.string().nullable().label("Note Type"),
  note: yup
    .string()
    .when("note_type", ([noteType], schema) => {
      if (noteType) {
        return schema.required();
      }
      return schema;
    })
    .label("Note"),
  sales_type: yup.string().required().label("Sales Type"),
  customer: yup.string().required().label("Customer"),
  items: yup.array(yup.object()).min(1).label("Invoice Item"),
});

export const updateInvoiceSchema = yup.object().shape({
  invoice_no: yup
    .string()
    .matches(
      alphanumericRegex,
      "Only alphanumeric characters, underscore, and dash are allowed",
    )
    .required()
    .label("Invoice No"),
  delivery_date: yup
    .date()
    .max(new Date())
    .required()
    .typeError("Invalid Date")
    .label("Delivery Date"),
  currency: yup.string().required().label("Currency"),
});

export const itemSchema = yup.object().shape({
  // dr_no: yup
  //   .string()
  //   .matches(
  //     alphanumericRegex,
  //     "Only alphanumeric characters, underscore, and dash are allowed",
  //   )
  //   .required()
  //   .label("Delivery receipt"),
  purchase_order_no: yup
    .string()
    .matches(
      alphanumericRegex,
      "Only alphanumeric characters, underscore, and dash are allowed",
    )
    .required()
    .label("Purchase order"),
  // particular: yup.string().required().label("Particular"),
  // part_no: yup
  //   .string()
  //   .matches(
  //     alphanumericRegex,
  //     "Only alphanumeric characters, underscore, and dash are allowed",
  //   )
  //   .required()
  //   .label("Part number"),
  quantity: yup
    .number()
    .min(0)
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label("Quantity"),
  unit_price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0)
    .required()
    .label("Unit price"),
});

export const updateItemSchema = yup.object().shape({
  unit_price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0)
    .required()
    .label("Unit price"),
  note_amount: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0.01)
    .when("unit_price", ([unitPrice], schema) => {
      return schema.max(unitPrice);
    })
    .required()
    .label("Note amount"),
  note_type: yup.string().required().label("Note Type"),
  note: yup.string().required().label("Note"),
});
