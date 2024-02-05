export interface RolesCheckerProps {
  allowedRoles?: UserRoles | UserRoles[];
  superAdminOnly?: boolean;
  nonSuperAdmin?: boolean;
  allowAll?: boolean;
}

export type UserRoles =
  | "SUPER_ADMIN"
  | "ORGANIZATION_ADMIN"
  | "ORGANIZATION_USER"
  | "ORGANIZATION_APPROVER";
