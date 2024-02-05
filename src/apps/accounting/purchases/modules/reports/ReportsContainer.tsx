import { Title } from "@mantine/core";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";

import ReportButtonsContents from "./components/ReportButtonsContents";
import ReportFilters from "./components/ReportFilters";
function ReportsContainer() {
  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <Title size="h3" className="title_reports">
        Generate Report
      </Title>
      <div className="flex">
        <ReportButtonsContents />
        <ReportFilters />
      </div>
    </ContainerWrapper>
  );
}

export default ReportsContainer;
