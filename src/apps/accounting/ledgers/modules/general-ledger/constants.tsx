import { TableFormatType, TableFormatTypes } from "common/components/table/types";
import { DateFormat } from "common/types";

export const tableFormat: TableFormatType[] = [
  {
    label: "Tx No.",
    colKey: "tx_no",
    width: 150,
  },
  {
    label: "Account",
    colKey: "account.title",
    width: 150,
  },
  {
    label: "Sub Ledger",
    colKey: "sub_ledger",
    width: 150,
  },
  {
    label: "Date",
    colKey: "date",
    formatAs: {
      format: DateFormat.SHORTMONTH,
      type: TableFormatTypes.DATE,
    },
    width: 150,
  },
  {
    label: "Debit",
    colKey: "debit",
    width: 150,
    formatAs: {
      format: 4,
      type: TableFormatTypes.NUMBER,
    },
  },
  {
    label: "Credit",
    colKey: "credit",
    width: 150,
    formatAs: {
      format: 4,
      type: TableFormatTypes.NUMBER,
    },
  },
  {
    label: "Particular",
    colKey: "particular",
  },
  {
    label: "Created date",
    colKey: "created_at",
    formatAs: {
      format: DateFormat.SHORTMONTH,
      type: TableFormatTypes.DATE,
    },
    width: 100,
  },
];

export const GENERAL_LEDGER = "GENERAL_LEDGER";
