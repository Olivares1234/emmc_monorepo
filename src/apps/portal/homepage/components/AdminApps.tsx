import { useMemo } from "react";
import { IconType } from "react-icons";
import { SUPER_ADMIN } from "common/components/roles/constants";
import useGetProfile from "hooks/useGetProfile";

import { adminAccessApps } from "../datasets";

import AppTile from "./AppTile";

function AdminApps() {
  const profile = useGetProfile();
  const role = useMemo(() => profile?.role.role, [profile]) as string;

  if (!SUPER_ADMIN.includes(role)) return null;
  return (
    <div className="w-full mt-4">
      <h4 className="text-gray-500 font-normal text-2xl">Admin</h4>
      <div className="grid grid-cols-4 gap-x-4 gap-y-8">
        {adminAccessApps.map((app) => (
          <AppTile key={app.label} icon={app.icon as IconType} {...app} />
        ))}
      </div>
    </div>
  );
}

export default AdminApps;
