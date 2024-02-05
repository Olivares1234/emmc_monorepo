import { useMemo } from "react";
import { IconType } from "react-icons";
import { SUPER_ADMIN } from "common/components/roles/constants";
import useGetProfile from "hooks/useGetProfile";

import { accountingAccessApps } from "../datasets";

import AppTile from "./AppTile";

function AccountingApps() {
  const profile = useGetProfile();
  const role = useMemo(() => profile?.role.role, [profile]) as string;
  const access = useMemo(() => profile?.users_modules, [profile]);

  return (
    <div className="w-full mt-4">
      <h4 className="text-gray-500 font-normal text-2xl">Accounting</h4>
      <div className="grid grid-cols-4 gap-x-4 gap-y-8">
        {accountingAccessApps.map((app) => (
          <AppTile
            key={app.label}
            icon={app.icon as IconType}
            {...app}
            isDisabled={
              !(
                SUPER_ADMIN.includes(role) ||
                access?.some((a) =>
                  a?.modules?.module?.toLowerCase().includes(app.label?.toLowerCase()),
                )
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

export default AccountingApps;
