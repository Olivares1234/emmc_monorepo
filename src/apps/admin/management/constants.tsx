import { RouteListTypes } from "apps/portal/homepage/types";

import ModulesContainer from "./modules";
import OrganizationsContainer from "./organizations";
import RolesContainer from "./roles";
import UsersContainer from "./users";

export const managementNavMenu: RouteListTypes[] = [
  {
    label: "Organizations",
    path: "/organizations",
    component: OrganizationsContainer,
  },
  {
    label: "Modules",
    path: "/modules",
    component: ModulesContainer,
  },
  {
    label: "Roles",
    path: "/roles",
    component: RolesContainer,
  },
  {
    label: "Users",
    path: "/users",
    component: UsersContainer,
  },
];
