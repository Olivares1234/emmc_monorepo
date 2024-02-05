import { RouteListTypes } from "apps/portal/homepage/types";

import { Approval } from "./modules/approval-request";
import { Collection } from "./modules/collections";
import { Customers } from "./modules/customers";
import { Dashboard } from "./modules/dashboard";
import { Invoice } from "./modules/invoices";
import { Reports } from "./modules/reports";
import { Logs } from "./modules/sales-logs";

export const salesNavMenu: RouteListTypes[] = [
  {
    label: "Dashboard",
    path: "",
    component: Dashboard,
  },
  {
    label: "Invoices",
    path: "/invoices/*",
    component: Invoice,
  },
  {
    label: "Collections",
    path: "/collections/*",
    component: Collection,
  },
  {
    label: "Approval Request",
    path: "/approval-request",
    component: Approval,
  },
  {
    label: "Customers",
    path: "/customers",
    component: Customers,
  },
  {
    label: "Reports",
    path: "/reports",
    component: Reports,
  },
  {
    label: "Logs",
    path: "/logs",
    component: Logs,
  },
];
