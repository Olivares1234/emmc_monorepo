import { useDocumentTitle } from "@mantine/hooks";
import { ContainerWrapper, Layout } from "common/components/layout";
import useCheckFirstLogin from "hooks/useCheckFirstLogin";

import AccountingApps from "./components/AccountingApps";
import AdminApps from "./components/AdminApps";
import OperationApps from "./components/OperationApps";
import ToolsApps from "./components/ToolsApps";

function PortalContainer() {
  useCheckFirstLogin();
  useDocumentTitle("EMMC SYSTEMS - PORTAL");
  return (
    <Layout title="Portal">
      <ContainerWrapper>
        <AdminApps />
        <AccountingApps />
        <OperationApps />
        <ToolsApps />
      </ContainerWrapper>
    </Layout>
  );
}

export default PortalContainer;
