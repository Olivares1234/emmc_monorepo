import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Title } from "@mantine/core";
import { confirmationDialog, useModalContext } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { Table } from "common/components/table";
import { TableActionMenu, TableFormatType } from "common/components/table/types";

import { useDeletePurchasesItem, useGetPurchasesItems } from "../hooks";

import PurchasesItemModal from "./PurchasesItemModal";

function PurchasesItemsTable() {
  const { id } = useParams();
  const [data, isLoading, pagination] = useGetPurchasesItems();
  const [deleteItem] = useDeletePurchasesItem(+(id as string));
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
    [data],
  );

  const purchasesItemTableFormat: TableFormatType[] = useMemo(
    () => [
      {
        label: "DR No",
        colKey: "dr_no",
      },
      {
        label: "PR No",
        colKey: "purchase_request_no",
      },
      {
        label: "PO No",
        colKey: "purchase_order_no",
      },
      {
        label: "Particular",
        colKey: "particular",
      },
      {
        label: "Part number",
        colKey: "part_no",
      },
      {
        label: "Quantity",
        colKey: "quantity",
      },
      {
        label: "Unit price",
        colKey: "unit_price",
      },
      {
        label: "Total",
        colKey: "total",
      },
    ],
    [],
  );

  const handleAddItem = () =>
    openModal({
      title: "Add Item",
      render: (close) => (
        <PurchasesItemModal
          onClose={close}
          data={{
            purchaseId: +(id as string),
            currentItemCount: data?.length,
          }}
        />
      ),
    });

  return (
    <Flex className="flex-grow" mt={24} direction="column">
      <Flex align="center" justify="space-between" mb={8}>
        <Title size="h3"> Purchase Order Items</Title>
        <RoleChecker nonSuperAdmin>
          <Button size="xs" color="teal" variant="outline" onClick={handleAddItem}>
            Add Item
          </Button>
        </RoleChecker>
      </Flex>
      <Table
        data={data}
        isLoading={isLoading}
        format={purchasesItemTableFormat}
        actionMenu={actionMenu}
        pagination={pagination}
      />
    </Flex>
  );
}

export default PurchasesItemsTable;
