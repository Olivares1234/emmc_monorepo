import { Route, Routes } from "react-router-dom";
import { Flex, Text } from "@mantine/core";
import { Layout } from "common/components/layout";

import { cdbNavMenu } from "./constant";

function CdbContainer() {
  return (
    <Layout
      title="CDB"
      navMenu={cdbNavMenu}
      footer={
        <Flex justify="flex-end" align="center" className="-mt-1">
          <Text size="sm" fw={600}>
            CDB &copy; {new Date().getFullYear()}
          </Text>
        </Flex>
      }
    >
      <Routes>
        {cdbNavMenu.map(({ component: Component, ...app }) => (
          <Route key={app.label} path={`${app.path}`} element={<Component />} />
        ))}
      </Routes>
    </Layout>
  );
}
export default CdbContainer;
