import { useMemo } from "react";
import { Button, Title } from "@mantine/core";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import ListSearchFilter from "common/components/list/ListSearchFilter";
import { confirmationDialog, useModalContext } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { Table } from "common/components/table";
import { TableActionMenu } from "common/components/table/types";

import TemplateModal from "./components/TemplateModal";
import { tableFormat } from "./constants";
import { useDeleteTemplate, useGetTemplates } from "./hooks";
import { Template } from "./types";

function TemplatesContainer() {
  const openModal = useModalContext();
  const [data, isLoading, paginate] = useGetTemplates();
  const [deleteTemplate] = useDeleteTemplate();

  const handleAdd = () =>
    openModal({
      title: "Create Template",
      render: (close) => <TemplateModal onClose={close} />,
      size: "auto",
    });

  const actionMenu: TableActionMenu[] = useMemo(
    () => [
      {
        label: "Edit",
        onClick: (data) =>
          openModal({
            title: "Edit Template",
            render: (close) => (
              <TemplateModal data={data as Template} isEditMode onClose={close} />
            ),
            size: 900,
          }),
      },
      {
        label: "Delete",
        onClick: (data) =>
          confirmationDialog({
            message: "Are you sure you want to delete this template?",
            onOk: async () => await deleteTemplate(data?.id as number),
          }),
      },
    ],
    [openModal],
  );

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <Title size="h3" className="title_reports">
        Report Templates
      </Title>
      <div className="flex items-center justify-between mb-4">
        <ListSearchFilter
          showInputOnly
          onChange={() => {}}
          // filterSelector={selectChecksFilter}
        />
        <RoleChecker nonSuperAdmin>
          <Button onClick={handleAdd} color="teal" className="mb-4">
            Create Template
          </Button>
        </RoleChecker>
      </div>
      <Table
        format={tableFormat}
        data={data}
        isLoading={isLoading}
        actionMenu={actionMenu}
        pagination={paginate}
      />
    </ContainerWrapper>
  );
}

export default TemplatesContainer;
