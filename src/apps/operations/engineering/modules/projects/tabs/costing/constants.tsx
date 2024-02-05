import { TableFormatType } from "common/components/table/types";

export const costingTableFormat: TableFormatType[] = [
  {
    label: "Flute",
    colKey: "flute",
  },
  {
    label: "Paper combination",
    colKey: "paperCombination",
  },
  {
    label: "MOQ",
    colKey: "moq",
  },
  {
    label: "L x W x H",
    colKey: "particular",
    customRender: (data) => {
      return `${data?.length}x${data?.width}x${data?.height}`;
    },
  },
  {
    label: "Material Price",
    colKey: "materialPrice",
    customRender: (data) => data?.materialPrice.toFixed(4),
  },
];

export const COSTING_LIST = "COSTING_LISTS";
export const COSTING_INFO = "COSTING_INFO";
