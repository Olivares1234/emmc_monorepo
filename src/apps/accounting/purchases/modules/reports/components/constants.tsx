import { GiMoneyStack } from "react-icons/gi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdReceiptLong } from "react-icons/md";
import { SiMoneygram } from "react-icons/si";
import { TPurchasesState } from "apps/accounting/purchases/redux/purchasesSlice";
import { AnyObject } from "common/types";

import { ReportButtons } from "../types";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const yearOptions = [
  ...Array.from({ length: 10 }, (_, index) => {
    const year = new Date().getFullYear() - index;
    return { value: year.toString(), label: year.toString() };
  }),
];

export const monthOptions = [
  ...months.map((month, index) => ({
    value: (index + 1).toString(),
    label: month,
  })),
];

export const weekOptions = [
  ...Array.from({ length: 52 }, (_, index) => ({
    value: (index + 1).toString(),
    label: (index + 1).toString(),
  })),
];

export const currencyOptions = [
  { value: "PHP", label: "PHP" },
  { value: "USD", label: "USD" },
];

export const displayConversion: Array<TPurchasesState["selectedReport"]> = [];

export const reportButtons: ReportButtons[] = [
  {
    label: "AP Summary",
    icon: <MdReceiptLong size={26} className="mr-2 report-button-icon" />,
    color: "teal",
    code: "AP",
  },
  {
    label: "Purchases Summary",
    icon: <HiOutlineClipboardList size={20} className="mr-2 report-button-icon" />,
    color: "teal",
    code: "PS",
  },
  {
    label: "Purchase Summary Ext.",
    icon: <SiMoneygram size={20} className="mr-2 report-button-icon" />,
    color: "teal",
    code: "PSE",
  },
  {
    label: "PAYABLES",
    icon: <GiMoneyStack size={20} className="mr-2 report-button-icon" />,
    color: "teal",
    code: "PYB",
  },
];

export const filterValues: Record<TPurchasesState["selectedReport"], AnyObject> = {
  PYB: {
    month: "",
    year: "",
  },
  AP: {
    month: "",
    year: "",
  },
  PS: {
    month: "",
    year: "",
  },
  PSE: {
    month: "",
    year: "",
  },
};

export const reportApi: Record<TPurchasesState["selectedReport"], string> = {
  PYB: "/payables",
  AP: "/payables-summary",
  PS: "/internal",
  PSE: "/external",
};
