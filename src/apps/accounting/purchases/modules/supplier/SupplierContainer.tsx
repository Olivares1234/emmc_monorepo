import { useMemo } from "react";
import { Button } from "@mantine/core";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import ListSearchFilter from "common/components/list/ListSearchFilter";
import { confirmationDialog, useModalContext } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { Table } from "common/components/table";
import { TableActionMenu } from "common/components/table/types";

import SupplierModal from "./components/SupplierModal";
import { tableFormat } from "./constants";
import { useDeleteSupplier, useGetSupplier } from "./hooks";
import { Supplier } from "./type";

function SupplierContainer() {
  const [data, isLoading, paginate] = useGetSupplier();
  const openModal = useModalContext();
  const [deleteSupplier] = useDeleteSupplier();

  const handleAdd = () =>
    openModal({
      title: "Create Supplier",
      render: (close) => <SupplierModal onClose={close} />,
      size: "xl",
    });

  const actionMenu: TableActionMenu[] = useMemo(
    () => [
      {
        label: "Edit",
        onClick: (data) =>
          openModal({
            title: "Edit Supplier",
            size: "80%",
            render: (close) => (
              <SupplierModal data={data as Supplier} isEditMode onClose={close} />
            ),
          }),
      },
      {
        label: "Delete",
        onClick: (data) =>
          confirmationDialog({
            message: "Are you sure you want to delete this supplier?",
            onOk: async () => await deleteSupplier(data?.id as number),
          }),
      },
    ],
    [],
  );

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <div className="flex items-center justify-between mb-4">
        <ListSearchFilter
          showInputOnly
          onChange={() => {
            //
          }}
        />
        <RoleChecker nonSuperAdmin>
          <Button onClick={handleAdd} color="teal" className="mb-4">
            Add Supplier
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
export default SupplierContainer;
