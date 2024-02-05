import { TableFormatType, TableFormatTypes } from "common/components/table/types";

export const entryTableFormat: TableFormatType[] = [
  {
    label: "Entry",
    colKey: "type",
  },
  {
    label: "Account",
    colKey: "account",
  },
  {
    label: "Debit",
    colKey: "debit",
    width: 100,
    formatAs: {
      format: 4,
      type: TableFormatTypes.NUMBER,
    },
  },
  {
    label: "Credit",
    colKey: "credit",
    width: 100,
    formatAs: {
      format: 4,
      type: TableFormatTypes.NUMBER,
    },
  },
  {
    label: "Particular",
    colKey: "particular",
  },
];

export const ENTRY_MODAL_TITLE = "Added Entries";
