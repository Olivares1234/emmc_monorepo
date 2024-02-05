import { Title } from "@mantine/core";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";

import CollectionChart from "./components/CollectionChart";
import Stats from "./components/Stats";

function DashboardContainer() {
  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <Title size="h3">Dashboard</Title>
      <Stats />
      <CollectionChart />
    </ContainerWrapper>
  );
}

export default DashboardContainer;
