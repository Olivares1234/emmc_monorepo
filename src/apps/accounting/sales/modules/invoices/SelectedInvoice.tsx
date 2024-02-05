import { FaEdit, FaTrash } from "react-icons/fa";
import { Button, clsx, Flex, Paper, Title, Tooltip } from "@mantine/core";
import { LoadingWithText } from "common/components/loader";
import { confirmationDialog, useModalContext } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { CustomTabs } from "common/components/tabs";
import { NoData } from "common/no-data";

import CollectionData from "./components/CollectionData";
import InvoiceDetails from "./components/InvoiceDetails";
import InvoiceItemsTable from "./components/InvoiceItemsTable";
import InvoiceUpdateModal from "./components/InvoiceUpdateModal";
import InvoiceUpdateStatusModal from "./components/InvoiceUpdateStatusModal";
import { useDeleteInvoice, useGetSingleInvoice } from "./hooks";
import { InvoiceStatus } from "./types";

export const InvoiceTabs = [
  {
    label: "Items",
    value: "item",
    component: <InvoiceItemsTable />,
  },
  {
    label: "Collection",
    value: "collection",
    component: <CollectionData />,
  },
];

function SelectedInvoice() {
  const [data, isLoading, queryRes] = useGetSingleInvoice();
  const openModal = useModalContext();
  // const nav = useNavigate();
  const [deleteInvoice] = useDeleteInvoice();

  const handleDelete = async () => {
    confirmationDialog({
      message: "Are you sure you want to delete this invoice?",
      onOk: async () => {
        await deleteInvoice(data?.id);
      },
    });
  };

  const handleEdit = () => {
    openModal({
      title: "Update invoice",
      render: (close) => <InvoiceUpdateModal data={data} onClose={close} />,
    });
  };

  const handleUpdateStatus = () => {
    openModal({
      title: "Update invoice status",
      render: (close) => (
        <InvoiceUpdateStatusModal
          data={{
            id: data.id,
            status: data.status as InvoiceStatus,
          }}
          onClose={close}
        />
      ),
    });
  };

  return (
    <Paper
      withBorder
      p={8}
      shadow="md"
      className={clsx("flex flex-col flex-grow relative")}
    >
      <LoadingWithText text="Loading invoice information..." show={isLoading} />
      {!isLoading && !queryRes?.error && (
        <>
          <Flex justify="space-between" align="center" mb={12}>
            <Title size="h3">Invoice Details</Title>
            <Flex columnGap={12}>
              {(data?.status === InvoiceStatus.Cancelled ||
                data?.status === InvoiceStatus.Revised) && (
                <RoleChecker nonSuperAdmin>
                  <Tooltip label="Update invoice status">
                    <Button size="xs" disabled={isLoading} onClick={handleUpdateStatus}>
                      <FaEdit />
                    </Button>
                  </Tooltip>
                </RoleChecker>
              )}
              {data?.status === InvoiceStatus.Not_Collected && (
                <RoleChecker nonSuperAdmin>
                  <Flex columnGap={12}>
                    <Button size="xs" disabled={isLoading} onClick={handleEdit}>
                      <FaEdit />
                    </Button>
                    <Button
                      color="red"
                      disabled={isLoading}
                      size="xs"
                      onClick={handleDelete}
                    >
                      <FaTrash />
                    </Button>
                  </Flex>
                </RoleChecker>
              )}
            </Flex>
          </Flex>

          <InvoiceDetails data={data} />
          <CustomTabs defaultValue="item" data={InvoiceTabs} />
        </>
      )}
      {!isLoading && queryRes.error ? (
        <Paper className="flex-grow flex items-center">
          <NoData message="Failed to get invoice details" />
        </Paper>
      ) : null}
    </Paper>
  );
}

export default SelectedInvoice;
