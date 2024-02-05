import * as yup from "yup";

export const schema = yup.object().shape({
  supplier_id: yup.string().required().label("Supplier"),
  accounts_id: yup.string().required().label("Accounts Code"),
  invoice_date: yup.date().max(new Date()).required().label("Invoice Date"),
  currency: yup.string().required().label("Currency"),
  classification: yup.string().required().label("Classification"),
  dr_no: yup.string().required().label("Delivery receipt no"),
  sales_type: yup.string().required().label("Sales Type"),
  invoice_no: yup.string().required().label("Invoice No"),
  items: yup.array(yup.object()).min(1).label("Invoice Item"),
});

export const itemSchema = yup.object().shape({
  purchase_order_no: yup.string().nullable().label("Purchase order no."),
  particular: yup.string().nullable().label("Particular"),
  purchases_request_no: yup.string().nullable().label("Purchase request no."),
  part_no: yup.string().nullable().label("Part no."),
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

export const paymentSchema = yup.object().shape({
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
  ar_no: yup.string().label("Acknowledgement No."),
  official_receipt_no: yup.string().required().label("Official receipt No."),
  payment_method: yup.string().required().label("Payment method"),
});
