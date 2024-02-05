import { TableFormatType } from "common/components/table/types";

export const CHECK_ITEMS = "CHECK_ITEMS";

export const checkTableFormat: TableFormatType[] = [
  {
    label: "Department",
    colKey: "department",
  },
  {
    label: "Type",
    colKey: "type",
  },
  {
    label: "Acct. Code",
    colKey: "accounts.code",
  },
  {
    label: "Acct. Title",
    colKey: "accounts.title",
  },
  {
    label: "Amount",
    colKey: "amount",
  },
  {
    label: "Explanation",
    colKey: "explanation",
  },
];
