import { BsCalendarWeek, BsGraphUpArrow } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdReceiptLong } from "react-icons/md";
import { SiMoneygram } from "react-icons/si";
import { TbZoomMoney } from "react-icons/tb";
import { TSalesState } from "apps/accounting/sales/redux/salesSlice";
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
  { value: "All", label: "All" },
  { value: "PHP", label: "PHP" },
  { value: "USD", label: "USD" },
];

export const displayMonth: Array<TSalesState["selectedReport"]> = [
  "AR",
  "SS",
  "SSE",
  "CR",
];
export const displayYear: Array<TSalesState["selectedReport"]> = [
  "AR",
  "SS",
  "SSE",
  "SALES",
  "WAR",
  "CR",
];
export const displayConversion: Array<TSalesState["selectedReport"]> = displayYear;

export const reportButtons: ReportButtons[] = [
  {
    label: "Statement of Accounts",
    icon: <TbZoomMoney size={20} className="mr-2 report-button-icon" />,
    color: "teal",
    code: "SOA",
  },
  {
    label: "Accounts Receivable",
    icon: <MdReceiptLong size={26} className="mr-2 report-button-icon" />,
    color: "teal",
    code: "AR",
  },
  {
    label: "Sales",
    icon: <BsGraphUpArrow size={20} className="mr-2 report-button-icon" />,
    color: "teal",
    code: "SALES",
  },
  {
    label: "Sales Summary",
    icon: <HiOutlineClipboardList size={20} className="mr-2 report-button-icon" />,
    color: "teal",
    code: "SS",
  },
  {
    label: "Sales Summary External",
    icon: <SiMoneygram size={20} className="mr-2 report-button-icon" />,
    color: "teal",
    code: "SSE",
  },
  {
    label: "Cash Receipt",
    icon: <GiMoneyStack size={20} className="mr-2 report-button-icon" />,
    color: "teal",
    code: "CR",
  },
  {
    label: "Weekly AR",
    icon: <BsCalendarWeek size={20} className="mr-2 report-button-icon" />,
    color: "teal",
    code: "WAR",
  },
];

export const filterValues: Record<TSalesState["selectedReport"], AnyObject> = {
  SOA: {
    customer: "",
    currency: "",
  },
  AR: {
    month: "",
    year: "",
    conversion: 50,
  },
  SALES: {
    year: "",
    conversion: 50,
  },
  SS: {
    month: "",
    year: "",
    conversion: 50,
  },
  SSE: {
    month: "",
    year: "",
    conversion: 50,
  },
  CR: {
    month: "",
    year: "",
    conversion: 50,
  },
  WAR: {
    year: "",
    conversion: 50,
    week: "",
  },
};

export const reportApi: Record<TSalesState["selectedReport"], string> = {
  SOA: "/soa",
  AR: "/accounts-receivable",
  SALES: "/sales",
  SS: "/sales-summary",
  SSE: "/sales-summary-ext",
  CR: "/cash-receipt",
  WAR: "/weekly-accounts-receivable",
};
