import { RouteListTypes } from "apps/portal/homepage/types";

import { Checks } from "./modules/checks";
import { Dashboard } from "./modules/dashboard";

export const cdbNavMenu: RouteListTypes[] = [
  {
    label: "Dashboard",
    path: "",
    component: Dashboard,
  },
  {
    label: "Checks & Vouchers",
    path: "/check-voucher/*",
    component: Checks,
  },
];
