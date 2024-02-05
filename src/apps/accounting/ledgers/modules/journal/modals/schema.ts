import * as yup from "yup";

export const journalItemSchema = yup.object().shape({
  type: yup.string().required().label("Entry type"),
  accountId: yup.number().required().label("Account"),
  particular: yup.string().required().label("Particular"),
  amount: yup.number().positive().required().label("Amount"),
});

export const journalSchema = yup.object().shape({
  items: yup.array().of(journalItemSchema).min(1).label("Check Items"),
  date: yup.date().nullable().required().max(new Date()).label("Date"),
});
