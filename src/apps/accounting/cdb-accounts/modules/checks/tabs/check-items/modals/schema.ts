import * as yup from "yup";

export const checkItemSchema = yup.object().shape({
  type: yup.string().required().label("Entry type"),
  accountId: yup.number().required().label("Account"),
  department: yup.string().required().label("Department"),
  amount: yup.number().positive().required().label("Amount"),
});

export const checkDetailItemSchema = yup.object().shape({
  items: yup.array().of(checkItemSchema).min(1).label("Check Items"),
});
