import { useMemo } from "react";
import { Button } from "@mantine/core";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import { useModalContext } from "common/components/modal";
import { confirmationDialog } from "common/components/modal/ConfirmationModal";
import { Table } from "common/components/table";
import { TableActionMenu, TableFormatType } from "common/components/table/types";

import ModulesModal from "./components/ModulesModal";
import { useDeleteModule, useGetModules } from "./hooks";

const tableFormat: TableFormatType[] = [
  {
    label: "No",
    colKey: "id",
  },
  {
    label: "Module",
    colKey: "module",
  },
  {
    label: "Created at",
    colKey: "created_at",
  },
];

function ModulesContainer() {
  const [data, isLoading, paginate] = useGetModules();
  const openModal = useModalContext();
  const [deleteModule] = useDeleteModule();

  const actionMenu: TableActionMenu[] = useMemo(
    () => [
      {
        label: "Delete",
        onClick: (data) =>
          confirmationDialog({
            message: "Are you sure you want to delete this module?",
            onOk: async () => await deleteModule(data?.id as number),
          }),
      },
    ],
    [],
  );

  const handleAdd = () =>
    openModal({
      title: "Create module",
      render: (close) => <ModulesModal onClose={close} />,
    });

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <div className="flex justify-end">
        <Button onClick={handleAdd} color="teal" className="mb-4">
          Create Module
        </Button>
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

export default ModulesContainer;
