import { AiOutlineCustomerService } from "react-icons/ai";
import { BiMoneyWithdraw, BiPurchaseTagAlt } from "react-icons/bi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { FaSignature } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { GoTools } from "react-icons/go";
import { MdOutlineManageAccounts } from "react-icons/md";
import { PiMathOperationsBold } from "react-icons/pi";
import { CDB, Ledger, Purchases, Sales } from "apps/accounting";
import ManagementContainer from "apps/admin/management/ManagementContainer";
import Tools from "apps/admin/tools";
import { Engineering } from "apps/operations";
import { UnderDevelopment } from "common/under-development";

import { RouteListTypes } from "./types";

export const adminAccessApps: RouteListTypes[] = [
  {
    path: "/admin/*",
    label: "Admin Management",
    icon: MdOutlineManageAccounts,
    component: ManagementContainer,
    description: "Manage organizations, modules, roles & users",
  },
  {
    path: "/tools",
    label: "Tools",
    icon: GoTools,
    component: Tools,
    description: "Helps to managing and maintaining the system",
  },
];

export const accountingAccessApps: RouteListTypes[] = [
  {
    path: "/sales/*",
    label: "Sales",
    icon: BiMoneyWithdraw,
    component: Sales,
    description:
      "Efficiently handle invoices, collections, and generate sales-related reports",
  },
  {
    path: "/purchases/*",
    label: "Purchases",
    icon: BiPurchaseTagAlt,
    component: Purchases,
    description:
      "Streamline purchase management, payments, and report generation for purchases",
  },
  {
    path: "/cdb-accounts/*",
    label: "CDB",
    icon: CiMoneyCheck1,
    component: CDB,
    description: "Manage vouchers and checks with ease",
  },
  {
    path: "/ledger/*",
    label: "Ledger",
    icon: FiBookOpen,
    component: Ledger,
    description:
      "Centralizes general ledger management and facilitates manual journal entries.",
  },
];

export const operationsAccessApps: RouteListTypes[] = [
  {
    path: "/engineering/*",
    label: "Engineering",
    icon: PiMathOperationsBold,
    component: Engineering,
    description: "Manage projects & costing",
  },
  {
    path: "/customers/*",
    label: "Customers",
    icon: AiOutlineCustomerService,
    component: UnderDevelopment,
  },
  {
    path: "/customers-order/*",
    label: "Customers Order",
    icon: BiPurchaseTagAlt,
    component: UnderDevelopment,
  },
  {
    path: "/inventory/*",
    label: "Inventory",
    icon: BiPurchaseTagAlt,
    component: UnderDevelopment,
  },
  {
    path: "/purchase-request/*",
    label: "Purchase Request",
    icon: CiMoneyCheck1,
    component: UnderDevelopment,
  },
  {
    path: "/purchase-orders/*",
    label: "Purchase Orders",
    icon: CiMoneyCheck1,
    component: UnderDevelopment,
  },
];

export const toolsAccessApps: RouteListTypes[] = [
  {
    path: "/signature/*",
    label: "Sig Hub",
    icon: FaSignature,
    component: UnderDevelopment,
  },
];
