import { TableFormatType } from "common/components/table/types";
import dayjs from "dayjs";
import { displayChanges } from "utils/helpers";

import { Logs } from "./types";

export const tableFormat: TableFormatType[] = [
  {
    label: "No",
    colKey: "id",
  },
  {
    label: "Email",
    colKey: "email",
  },
  {
    label: "Actions",
    colKey: "request_type",
  },
  {
    label: "Description",
    colKey: "description",
    customRender: (val: Logs) => {
      if (val.request_type === "UPDATED" && Object?.keys(val.difference)?.length > 0) {
        return displayChanges(val.difference, [
          "barangay_code",
          "region_code",
          "municipality_code",
          "province_code",
        ]);
      }

      return val.description;
    },
  },
  {
    label: "Date",
    colKey: "created_at",
    customRender: (val) => dayjs(val?.created_at).format("MMM DD, YYYY hh:mm:ss"),
  },
];

export const LOGS = "LOGS";
export const LOGS_OPTIONS = "LOGS_OPTIONS";
