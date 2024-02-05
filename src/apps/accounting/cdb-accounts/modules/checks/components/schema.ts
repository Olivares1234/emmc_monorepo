import * as yup from "yup";

import { checkItemSchema } from "../tabs/check-items/modals/schema";

export const checkDetailSchema = yup.object().shape({
  datePrepared: yup.date().max(new Date()).required().label("Date prepared"),
  voucherDate: yup.date().max(new Date()).required().label("Voucher date"),
  checkDate: yup.date().max(new Date()).required().label("Check date"),
  payeesName: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9_ -]+$/, "Invalid payee name")
    .label("Payee name"),
  checkNumber: yup.string().nullable().min(1).required().label("Check Number"),
  voucherNumber: yup.string().nullable().min(1).required().label("Voucher Number"),
  items: yup.array().of(checkItemSchema).min(1).label("Check Items"),
});
