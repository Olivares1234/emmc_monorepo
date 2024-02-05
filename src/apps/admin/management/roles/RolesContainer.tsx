import { useMemo } from "react";
import { Button } from "@mantine/core";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import { useModalContext } from "common/components/modal";
import { confirmationDialog } from "common/components/modal/ConfirmationModal";
import { Table } from "common/components/table";
import { TableActionMenu, TableFormatType } from "common/components/table/types";

import RolesModal from "./components/RolesModal";
import { useDeleteRole, useGetRoles } from "./hooks";

const tableFormat: TableFormatType[] = [
  {
    label: "No",
    colKey: "id",
  },
  {
    label: "Role",
    colKey: "role",
  },
  {
    label: "Created at",
    colKey: "created_at",
  },
];

function RolesContainer() {
  const [data, isLoading, paginate] = useGetRoles();
  const [deleteRole] = useDeleteRole();
  const openModal = useModalContext();

  const actionMenu: TableActionMenu[] = useMemo(
    () => [
      {
        label: "Delete",
        onClick: (data) =>
          confirmationDialog({
            message: "Are you sure you want to delete this role?",
            onOk: async () => await deleteRole(data?.id as number),
          }),
      },
    ],
    [],
  );

  const handleAdd = () =>
    openModal({
      title: "Create role",
      render: (close) => <RolesModal onClose={close} />,
    });

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <div className="flex justify-end">
        <Button onClick={handleAdd} color="teal" className="mb-4">
          Create Role
        </Button>
      </div>
      <Table
        format={tableFormat}
        data={data}
        isLoading={isLoading}
        pagination={paginate}
        actionMenu={actionMenu}
      />
    </ContainerWrapper>
  );
}

export default RolesContainer;
