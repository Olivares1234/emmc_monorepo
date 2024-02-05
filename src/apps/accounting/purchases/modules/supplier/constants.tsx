import { TableFormatType } from "common/components/table/types";
import { formatAddress } from "utils/helpers";

export const tableFormat: TableFormatType[] = [
  {
    label: "No",
    colKey: "id",
  },
  {
    label: "Name",
    colKey: "name",
  },
  {
    label: "Address",
    colKey: "address",
    customRender: formatAddress,
  },
  {
    label: "TIN No",
    colKey: "tin_no",
  },

  {
    label: "Payment Terms",
    colKey: "payment_terms",
  },
  {
    label: "Transaction Type",
    colKey: "preferred_transaction_type",
  },
];

export const SUPPLIER = "SUPPLIER";
export const SUPPLIER_OPTIONS = "SUPPLIER_OPTIONS";
