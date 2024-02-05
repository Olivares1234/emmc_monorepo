import { PropsWithChildren, useMemo } from "react";

import { ORGANIZATION_APPROVER, SUPER_ADMIN } from "./constants";
import { useGetUserRole } from "./hooks";
import { RolesCheckerProps, UserRoles } from "./types";

function RoleChecker({
  allowedRoles,
  nonSuperAdmin,
  superAdminOnly,
  children,
  allowAll,
}: PropsWithChildren<RolesCheckerProps>) {
  const userRole = useGetUserRole();

  const isRoleAllowed = useMemo(() => {
    if (typeof allowedRoles === "string") return userRole === allowedRoles;
    return allowedRoles?.includes(userRole as UserRoles);
  }, [userRole, allowedRoles]);

  if (allowAll) return <>{children}</>;
  if (userRole === SUPER_ADMIN && superAdminOnly) return <>{children}</>;
  if (userRole !== SUPER_ADMIN && userRole !== ORGANIZATION_APPROVER && nonSuperAdmin)
    return <>{children}</>;
  if (isRoleAllowed) return <>{children}</>;
  return null;
}

export default RoleChecker;
