import { ModuleType } from "apps/admin/management/modules/types";
import { OrganizationType } from "apps/admin/management/organizations/types";
import { RoleType } from "apps/admin/management/roles/types";

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export type LoginHook = [(payload: LoginPayload) => Promise<any>, boolean, string];

export interface UserProfile {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: null | string;
  organization: OrganizationType;
  role: RoleType;
  users_modules: Array<{
    id: number;
    module_id: number;
    user_id: number;
    modules: ModuleType;
  }>;
}
