import { Navigate, Route, Routes, useResolvedPath } from "react-router-dom";
import { Flex, Text } from "@mantine/core";
import { Layout } from "common/components/layout";
import NotFound from "common/not-found/NotFound";

import { managementNavMenu } from "./constants";

function ManagementContainer() {
  const path = useResolvedPath("").pathname;
  return (
    <Layout
      title="Admin management"
      navMenu={managementNavMenu}
      footer={
        <Flex justify="flex-end" align="center" className="-mt-1">
          <Text size="sm" fw={600}>
            Admin management &copy; {new Date().getFullYear()}
          </Text>
        </Flex>
      }
    >
      <Routes>
        {managementNavMenu.map(({ component: Component, ...app }) => (
          <Route key={app.label} path={app.path} element={<Component />} />
        ))}
        <Route path="" element={<Navigate to={`${path}/organizations`} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
export default ManagementContainer;
