import { Route, Routes } from "react-router-dom";
import { Flex, Text } from "@mantine/core";
import { Layout } from "common/components/layout";

import { salesNavMenu } from "./constants";

function EngineeringContainer() {
  return (
    <Layout
      title="Engineering"
      navMenu={salesNavMenu}
      footer={
        <Flex justify="flex-end" align="center" className="-mt-1">
          <Text size="sm" fw={600}>
            Engineering &copy; {new Date().getFullYear()}
          </Text>
        </Flex>
      }
    >
      <Routes>
        {salesNavMenu.map(({ component: Component, ...app }) => (
          <Route key={app.label} path={`${app.path}`} element={<Component />} />
        ))}
      </Routes>
    </Layout>
  );
}
export default EngineeringContainer;
