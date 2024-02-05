import { Route, Routes } from "react-router-dom";
import { Flex, Text } from "@mantine/core";
import { Layout } from "common/components/layout";

import { purchasesNavMenu } from "./constant";

function PurchasesContainer() {
  return (
    <Layout
      title="Purchases"
      navMenu={purchasesNavMenu}
      footer={
        <Flex justify="flex-end" align="center" className="-mt-1">
          <Text size="sm" fw={600}>
            Purchases &copy; {new Date().getFullYear()}
          </Text>
        </Flex>
      }
    >
      <Routes>
        {purchasesNavMenu.map(({ component: Component, ...app }) => (
          <Route key={app.label} path={`${app.path}`} element={<Component />} />
        ))}
      </Routes>
    </Layout>
  );
}
export default PurchasesContainer;
