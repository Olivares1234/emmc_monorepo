import { useMemo } from "react";
import { Button } from "@mantine/core";
import { UserProfile } from "apps/portal/auth/types";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import { useModalContext } from "common/components/modal";
import { confirmationDialog } from "common/components/modal/ConfirmationModal";
import { Table } from "common/components/table";
import { TableActionMenu, TableFormatType } from "common/components/table/types";

import UsersModal from "./components/UsersModal";
import { useDeleteusers, useGetUsers } from "./hooks";

const tableFormat: TableFormatType[] = [
  {
    label: "No",
    colKey: "id",
  },
  {
    label: "First name",
    colKey: "first_name",
  },
  {
    label: "Last name",
    colKey: "last_name",
  },
  {
    label: "Email",
    colKey: "email",
  },
  {
    label: "Organization",
    colKey: "organization.name",
  },
  {
    label: "Role",
    colKey: "role.role",
  },
  {
    label: "Created at",
    colKey: "created_at",
    defaultValue: "-",
  },
];

function UsersContainer() {
  const [data, isLoading, paginate] = useGetUsers();
  const openModal = useModalContext();
  const [deleteUser] = useDeleteusers();

  const actionMenu: TableActionMenu[] = useMemo(
    () => [
      {
        label: "Edit user",
        onClick: (data) =>
          openModal({
            title: "Edit",
            render: (close) => (
              <UsersModal data={data as UserProfile} isEditMode onClose={close} />
            ),
          }),
      },
      {
        label: "Delete",
        onClick: (data) =>
          confirmationDialog({
            message: "Are you sure you want to delete this user?",
            onOk: async () => await deleteUser(data?.id as number),
          }),
      },
    ],
    [],
  );

  const handleAdd = () =>
    openModal({
      title: "Create users",
      render: (close) => <UsersModal onClose={close} />,
    });

  return (
    <ContainerWrapper>
      <MenuBreadcrumbs />
      <div className="flex justify-end">
        <Button onClick={handleAdd} color="teal" className="mb-4">
          Create Users
        </Button>
      </div>
      <Table<UserProfile>
        actionMenu={actionMenu}
        format={tableFormat}
        data={data}
        isLoading={isLoading}
        pagination={paginate}
      />
    </ContainerWrapper>
  );
}

export default UsersContainer;
