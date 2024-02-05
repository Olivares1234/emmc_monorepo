import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Title } from "@mantine/core";
import { confirmationDialog, useModalContext } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { Table } from "common/components/table";
import { TableActionMenu } from "common/components/table/types";

import CheckItemModal from "./modals/CheckItemModal";
import { checkTableFormat } from "./constants";
import { useDeleteCheckItems, useGetCheckItems } from "./hooks";

function CheckItemsTable() {
  const { id } = useParams();
  const [data, isLoading, pagination] = useGetCheckItems();
  const [deleteItem] = useDeleteCheckItems(Number(id));
  const openModal = useModalContext();

  const actionMenu: TableActionMenu[] = useMemo(
    () => [
      {
        label: "Delete",
        onClick: (data) =>
          confirmationDialog({
            message: "Are you sure you want to delete this item?",
            onOk: async () => await deleteItem(data?.id),
          }),
      },
    ],
    [deleteItem],
  );

  const handleAddItem = () => {
    openModal({
      title: "Add Check Item",
      size: "800px",
      render: (close) => <CheckItemModal onClose={close} data={+(id as string)} />,
    });
  };

  return (
    <Flex className="flex-grow" mt={24} direction="column">
      <Flex align="center" justify="space-between" mb={8}>
        <Title size="h3">Check Items</Title>
        <RoleChecker nonSuperAdmin>
          <Button size="xs" color="teal" variant="outline" onClick={handleAddItem}>
            Add Item
          </Button>
        </RoleChecker>
      </Flex>
      <Table
        data={data}
        isLoading={isLoading}
        format={checkTableFormat}
        actionMenu={actionMenu}
        pagination={pagination}
      />
    </Flex>
  );
}

export default CheckItemsTable;
