import { TableFormatType } from "common/components/table/types";
import dayjs from "dayjs";
import { startCase } from "utils/helpers";

import CheckItemsTable from "./tabs/check-items/CheckItemsTable";

export const tableFormat: TableFormatType[] = [
  {
    label: "Account ID",
    colKey: "accounts.title",
  },
  {
    label: "Payee Name",
    colKey: "payees_name",
  },
  {
    label: "Department",
    colKey: "department",
    customRender: (data) => startCase(data?.department),
  },
  {
    label: "Check Number",
    colKey: "check_number",
  },
  {
    label: "Voucher Number",
    colKey: "voucher_number",
  },
  {
    label: "Amount",
    colKey: "amount",
  },
  {
    label: "Check Date",
    colKey: "check_date",
    customRender: (data) => dayjs(data?.check_date).format("MM-DD-YYYY"),
  },
  {
    label: "Voucher Date",
    colKey: "voucher_date",
    customRender: (data) => dayjs(data?.voucher_date).format("MM-DD-YYYY"),
  },
  {
    label: "Date Prepared",
    colKey: "date_prepared",
    customRender: (data) => dayjs(data?.date_prepared).format("MM-DD-YYYY"),
  },
];

export const CHECKS = "CHECKS";
export const CHECKS_OPTIONS = "CHECKS_OPTIONS";
export const CHECK_INFO = "CHECK_INFO";

export const checkTabs = [
  {
    label: "Items",
    value: "item",
    component: <CheckItemsTable />,
  },
];
