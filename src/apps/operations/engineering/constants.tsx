import { RouteListTypes } from "apps/portal/homepage/types";

import { Dashboard } from "./modules/dashboard";
import { Projects } from "./modules/projects";

export const salesNavMenu: RouteListTypes[] = [
  {
    label: "Dashboard",
    path: "",
    component: Dashboard,
  },
  {
    label: "Projects",
    path: "/projects/*",
    component: Projects,
  },
];
