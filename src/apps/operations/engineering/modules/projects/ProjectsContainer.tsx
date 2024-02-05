import { useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { Button, Flex, Paper, Title } from "@mantine/core";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import { List } from "common/components/list";
// import ListSearchFilter from "common/components/list/ListSearchFilter";
import { useModalContext } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { NoData } from "common/no-data";

// import { selectInvoiceFilter } from "../../redux/selectors";
// import { selectInvoiceFilter } from "../../redux/selectors";
import ProjectModal from "./modals/ProjectModal";
import { useGetProjects } from "./hooks";
// import { useGetInvoices } from "./hooks";
// import { MOCK_PROJECTS } from "./mocks";
import SelectedInvoice from "./SelectedProject";
import { Project } from "./types";

function InvoiceContainer() {
  const openModal = useModalContext();
  const [{ data }, isLoading, pagination] = useGetProjects();

  const handleAdd = () =>
    openModal({
      title: "Create Project",
      render: (close) => <ProjectModal onClose={close} />,
    });

  const renderItem = useCallback(
    (d: Project) => (
      <div className="flex items-center justify-between py-1.5">
        <div>{d?.name}</div>
      </div>
    ),
    [],
  );

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <Title size="h3">Projects (100)</Title>
      <Flex className="flex-grow" columnGap={24}>
        <Flex direction="column" className="w-96" rowGap={5}>
          <RoleChecker allowAll>
            <Flex columnGap={6}>
              <Button className="flex-1" color="teal" onClick={handleAdd}>
                Create Project
              </Button>
            </Flex>
          </RoleChecker>
          {/* <ListSearchFilter
            filterSelector={selectInvoiceFilter}
            advanceFilterElement={InvoiceFilter}
            onChange={() => {}}
          /> */}
          <List
            data={data}
            dataKey="id"
            item={renderItem}
            isLoading={isLoading}
            pagination={pagination}
          />
        </Flex>
        <Flex direction="column" className="flex-grow">
          <Routes>
            <Route
              index
              element={
                <Paper className="flex-grow flex items-center">
                  <NoData message="No selected invoice" />
                </Paper>
              }
            />
            <Route path="/:id" element={<SelectedInvoice />} />
          </Routes>
        </Flex>
      </Flex>
    </ContainerWrapper>
  );
}

export default InvoiceContainer;
