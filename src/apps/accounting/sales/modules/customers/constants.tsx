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
    label: "Payment terms",
    colKey: "payment_terms",
  },
  {
    label: "Created at",
    colKey: "created_at",
  },
];

export const CUSTOMERS = "CUSTOMERS";
export const CUSTOMERS_OPTIONS = "CUSTOMERS_OPTIONS";
