import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button, Center, clsx, Flex, Title } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import StatusRenderer from "common/components/description/StatusRenderer";
import { confirmationDialog, useModalContext } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { Table } from "common/components/table";
import { TableActionMenu, TableFormatType } from "common/components/table/types";
import { pick } from "utils/helpers";

import { INVOICE_INFO } from "../constants";
import { useDeleteInvoiceItem, useGetInvoiceItems } from "../hooks";
import { Invoice, InvoiceItem, InvoiceStatus } from "../types";

import { itemStatusColors } from "./constants";
import InvoiceItemModal from "./InvoiceItemModal";
import InvoiceItemUpdate from "./InvoiceItemUpdate";
import NoteDetails from "./NoteDetails";

function InvoiceItemsTable() {
  const { id } = useParams();
  const [data, isLoading, pagination] = useGetInvoiceItems();
  const client = useQueryClient();
  const values = client.getQueryData<Invoice>([INVOICE_INFO, id]);
  const [deleteItem] = useDeleteInvoiceItem(+(id as string));
  const openModal = useModalContext();

  const actionMenu: TableActionMenu[] = useMemo(
    () => [
      {
        label: "Update",
        onClick: (data) =>
          openModal({
            title: `Update item ${data?.part_no}`,
            render: (close) => (
              <InvoiceItemUpdate data={data as InvoiceItem} onClose={close} />
            ),
          }),
        hidden: (data) => data.note_type,
      },
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

  const viewNoteDetails = (data: InvoiceItem) =>
    openModal({
      title: "Note Details",
      render: () => <NoteDetails {...pick(["note_type", "note", "note_amount"], data)} />,
    });

  const invoiceItemTableFormat: TableFormatType[] = useMemo(
    () => [
      {
        label: "DR No",
        colKey: "dr_no",
      },
      {
        label: "PO No",
        colKey: "purchase_order_no",
      },
      {
        label: "Particular",
        colKey: "particular",
        withTooltip: true,
      },
      {
        label: "Part No",
        colKey: "part_no",
      },
      {
        label: "Quantity",
        colKey: "quantity",
      },
      {
        label: "Unit price",
        colKey: "unit_price",
        customRender: (val: InvoiceItem) => {
          const formattedTotal = val?.unit_price?.toFixed(4) ?? 0;
          return <div>{formattedTotal}</div>;
        },
      },
      {
        label: "Total",
        colKey: "total",
        customRender: (val: InvoiceItem) => {
          const formattedTotal = val?.total?.toFixed(4) ?? 0;
          return <div>{formattedTotal}</div>;
        },
      },
      {
        label: "Remarks",
        colKey: "remarks",
      },
      {
        label: "Note",
        colKey: "total",
        customRender: (val: InvoiceItem) => (
          <Center
            className={clsx(val?.note_type && "cursor-pointer")}
            onClick={() => {
              if (!val?.note_type) return;
              viewNoteDetails(val);
            }}
          >
            <StatusRenderer status={val?.note_type ?? "None"} colors={itemStatusColors} />
          </Center>
        ),
      },
    ],
    [],
  );

  const handleAddItem = () =>
    openModal({
      title: "Add Item",
      render: (close) => <InvoiceItemModal onClose={close} data={+(id as string)} />,
    });

  return (
    <Flex className="flex-grow" mt={24} direction="column">
      <Flex align="center" justify="space-between" mb={8}>
        <Title size="h3"> Invoice Items</Title>
        {values?.status === InvoiceStatus.Not_Collected && (
          <RoleChecker nonSuperAdmin>
            <Button size="xs" color="teal" variant="outline" onClick={handleAddItem}>
              Add Item
            </Button>
          </RoleChecker>
        )}
      </Flex>
      <Table
        data={data}
        isLoading={isLoading}
        format={invoiceItemTableFormat}
        actionMenu={actionMenu}
        pagination={pagination}
      />
    </Flex>
  );
}

export default InvoiceItemsTable;
