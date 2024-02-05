import { JournalForm, JournalFormItem } from "./types";

export const journalModalDefault: JournalForm = {
  date: null,
  items: [],
};

export const journalItemModalDefault: JournalFormItem = {
  accountId: 0,
  amount: 0,
  particular: "",
  type: "",
};
