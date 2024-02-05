// import { projectDefaultValue } from "./modals/constants";

import { Customers } from "apps/accounting/sales/modules/customers/types";

// export type ProjectsDefaultValue = {
//   items: Array<typeof projectsItemDefaultValue>;
// } & Omit<typeof projectDefaultValue, "items">;

export interface Project {
  id: number;
  name: string;
  customerId: number;
  customer: Customers;
  createdAt: Date;
}

export type Projects = Project[];
