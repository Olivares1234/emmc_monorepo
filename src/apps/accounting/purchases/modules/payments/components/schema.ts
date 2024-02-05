import * as yup from "yup";

export const paymentsSchema = yup.object().shape({
  invoice_ids: yup.array(yup.number()).min(1).required().label("Invoices"),
  payment_date: yup
    .date()
    .required()
    .typeError("Payment Date is required")
    .label("Payment Date"),
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
