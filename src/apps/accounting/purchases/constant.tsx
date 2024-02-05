import { RouteListTypes } from "apps/portal/homepage/types";

import { Accounts } from "./modules/accounts";
import { Dashboard } from "./modules/dashboard";
import { Payments } from "./modules/payments";
import { Purchases } from "./modules/purchases";
import { Reports } from "./modules/reports";
import { Supplier } from "./modules/supplier";

export const purchasesNavMenu: RouteListTypes[] = [
  {
    label: "Dashboard",
    path: "",
    component: Dashboard,
  },
  {
    label: "Accounts",
    path: "/accounts",
    component: Accounts,
  },
  {
    label: "Purchase Details",
    path: "/purchases-details/*",
    component: Purchases,
  },
  {
    label: "Payments",
    path: "/payments/*",
    component: Payments,
  },
  {
    label: "Supplier",
    path: "/supplier",
    component: Supplier,
  },
  {
    label: "Reports",
    path: "/reports",
    component: Reports,
  },
];
