import { StatusRenderer } from "common/components/description";
import { TableFormatType } from "common/components/table/types";

import { Approval } from "./types";

export const tableFormat: TableFormatType[] = [
  {
    label: "Approval ID",
    colKey: "id",
    width: 50,
  },
  {
    label: "Requested by",
    colKey: "requested_by",
  },
  {
    label: "Module",
    colKey: "module",
  },
  {
    label: "Status",
    colKey: "is_approved",
    customRender: (val: Approval) => (
      <StatusRenderer
        colors={approvalStatus}
        status={val?.is_approved ? "approved" : "not_approved"}
      />
    ),
    width: 200,
  },
];

export const APPROVAL = "APPROVAL";
export const APPROVAL_OPTIONS = "APPROVAL_OPTIONS";

export const approvalStatus = {
  approved: {
    dark: "bg-green-800",
    light: "bg-green-500",
  },
  not_approved: {
    dark: "bg-red-800",
    light: "bg-red-500",
  },
  default: {
    dark: "bg-green-800",
    light: "bg-green-500",
  },
};
