import { useMemo } from "react";
import { Button } from "@mantine/core";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import { useModalContext } from "common/components/modal";
import { confirmationDialog } from "common/components/modal/ConfirmationModal";
import { Table } from "common/components/table";
import { TableActionMenu, TableFormatType } from "common/components/table/types";

import OrganizationsModal from "./components/OrganizationsModal";
import { useDeleteOrganization, useGetOrganizations } from "./hooks";
import { OrganizationType } from "./types";

const tableFormat: TableFormatType[] = [
  {
    label: "Name",
    colKey: "name",
  },
  {
    label: "Description",
    colKey: "description",
  },
  {
    label: "Created at",
    colKey: "created_at",
  },
];

function OrganizationsContainer() {
  const [data, isLoading, paginate] = useGetOrganizations();
  const openModal = useModalContext();
  const [deleteOrg] = useDeleteOrganization();

  const actionMenu: TableActionMenu[] = useMemo(
    () => [
      {
        label: "Edit",
        onClick: (data) =>
          openModal({
            title: "Edit organization",
            render: (close) => (
              <OrganizationsModal
                data={data as OrganizationType}
                isEditMode
                onClose={close}
              />
            ),
          }),
      },
      {
        label: "Delete",
        onClick: (data) =>
          confirmationDialog({
            message: "Are you sure you want to delete this organization?",
            onOk: async () => await deleteOrg(data?.id as number),
          }),
      },
    ],
    [],
  );

  const handleAdd = () =>
    openModal({
      title: "Create organization",
      render: (close) => <OrganizationsModal onClose={close} />,
    });

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <div className="flex justify-end">
        <Button onClick={handleAdd} color="teal" className="mb-4">
          Create Organization
        </Button>
      </div>
      <Table
        actionMenu={actionMenu}
        format={tableFormat}
        data={data}
        isLoading={isLoading}
        pagination={paginate}
      />
    </ContainerWrapper>
  );
}

export default OrganizationsContainer;
