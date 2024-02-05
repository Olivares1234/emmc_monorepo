import { TableFormatType } from "common/components/table/types";
import dayjs from "dayjs";

import { labelContainsDate } from "./utils";

export const approvalTableFormat: TableFormatType[] = [
  {
    label: "",
    colKey: "label",
  },
  {
    label: "From",
    colKey: "old",
    customRender: (val) => {
      if (labelContainsDate(val?.label)) {
        return dayjs(val?.old).format("MMM DD, YYYY");
      }
      return val?.old;
    },
  },
  {
    label: "To",
    colKey: "new",
    customRender: (val) => {
      if (labelContainsDate(val?.label)) {
        return dayjs(val?.new).format("MMM DD, YYYY");
      }
      return val?.new;
    },
  },
];
