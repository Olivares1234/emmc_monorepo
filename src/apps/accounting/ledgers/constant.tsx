import { RouteListTypes } from "apps/portal/homepage/types";

import { Dashboard } from "./modules/dashboard";
import { GeneralLedger } from "./modules/general-ledger";
import { Journal } from "./modules/journal";

export const ledgerNavMenu: RouteListTypes[] = [
  {
    label: "Dashboard",
    path: "",
    component: Dashboard,
  },
  {
    label: "Journal",
    path: "/journal",
    component: Journal,
  },
  {
    label: "General Ledger",
    path: "/general-ledger",
    component: GeneralLedger,
  },
];
