import { Route, Routes } from "react-router-dom";
import { Flex, Text } from "@mantine/core";
import { Layout } from "common/components/layout";

import { ledgerNavMenu } from "./constant";

function LedgerContainer() {
  return (
    <Layout
      title="Ledger"
      navMenu={ledgerNavMenu}
      footer={
        <Flex justify="flex-end" align="center" className="-mt-1">
          <Text size="sm" fw={600}>
            Ledger &copy; {new Date().getFullYear()}
          </Text>
        </Flex>
      }
    >
      <Routes>
        {ledgerNavMenu.map(({ component: Component, ...app }) => (
          <Route key={app.label} path={`${app.path}`} element={<Component />} />
        ))}
      </Routes>
    </Layout>
  );
}
export default LedgerContainer;
