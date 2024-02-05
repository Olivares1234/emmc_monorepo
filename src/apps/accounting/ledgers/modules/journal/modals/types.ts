export interface JournalForm {
  date: Date | null;
  items: JournalFormItem[];
}

export interface JournalFormItem {
  accountId: number;
  particular: string;
  amount: number;
  type: string;
}
