import { useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MantineProvider } from "@mantine/core";
import { selectIsAuth } from "apps/portal/auth/redux/selectors";
import { selectScheme } from "common/components/layout/redux/selectors";
import { ModalMarker, ModalProvider } from "common/components/modal";
import { ToastMarker } from "common/components/toast";
import AppGettingReady from "common/getting-ready/AppGettingReady";
import useCheckAuth from "hooks/useCheckAuth";
import { useAppSelector } from "redux/hooks";
import PrivateRoutes from "routes/PrivateRoutes";
import PublicRoutes from "routes/PublicRoutes";
import { SetNavigator } from "utils/history";

function App(): JSX.Element {
  const isAuth = useAppSelector(selectIsAuth);
  const colorScheme = useAppSelector(selectScheme);
  const isAppReady = useCheckAuth();

  const routes = useMemo(() => {
    if (!isAppReady) return <AppGettingReady />;

    return isAuth ? <PrivateRoutes /> : <PublicRoutes />;
  }, [isAppReady, isAuth]);

  return (
    <MantineProvider
      theme={{
        colorScheme,
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <SetNavigator />
      <DndProvider backend={HTML5Backend}>
        <ModalProvider>
          <div className="min-h-screen min-w-screen flex flex-col">{routes}</div>
        </ModalProvider>
      </DndProvider>
      <ToastMarker />
      <ModalMarker />
    </MantineProvider>
  );
}

export default App;
