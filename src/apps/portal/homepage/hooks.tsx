import { ReactNode, useMemo } from "react";
import { Route } from "react-router-dom";
import { SUPER_ADMIN } from "common/components/roles/constants";
import useGetProfile from "hooks/useGetProfile";

import { accountingAccessApps, adminAccessApps, operationsAccessApps } from "./datasets";

export const useGetAccessRoutes = (): ReactNode => {
  const profile = useGetProfile();
  const role = useMemo(() => profile?.role.role, [profile]) as string;
  const access = useMemo(() => profile?.users_modules, [profile]);

  const accessRoutes = useMemo(() => {
    const routes: JSX.Element[] = [];
    if (role === SUPER_ADMIN) {
      routes.push(
        ...adminAccessApps.map(({ component: Component, ...app }) => (
          <Route key={app.label} path={app.path} element={<Component />} />
        )),
      );
    }

    routes.push(
      ...accountingAccessApps
        .filter(
          (app) =>
            SUPER_ADMIN === role ||
            access?.some((a) =>
              a?.modules?.module?.toLowerCase().includes(app.label?.toLowerCase()),
            ),
        )
        .map(({ component: Component, ...app }) => (
          <Route key={app.label} path={app.path} element={<Component />} />
        )),
    );

    routes.push(
      ...operationsAccessApps
        .filter(
          (app) =>
            SUPER_ADMIN === role ||
            access?.some((a) =>
              a?.modules?.module?.toLowerCase().includes(app.label?.toLowerCase()),
            ),
        )
        .map(({ component: Component, ...app }) => (
          <Route key={app.label} path={app.path} element={<Component />} />
        )),
    );

    return routes;
  }, [role]);

  return accessRoutes;
};
