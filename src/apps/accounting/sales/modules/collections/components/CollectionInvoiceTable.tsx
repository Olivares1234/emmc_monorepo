import { useMemo } from "react";
import { Center, Flex, Title } from "@mantine/core";
import StatusRenderer from "common/components/description/StatusRenderer";
import { Table } from "common/components/table";
import { TableFormatType } from "common/components/table/types";

import { statusColors } from "../../invoices/components/constants";
import { Invoice } from "../../invoices/types";
import { useGetCollectionInvoice } from "../hooks";

function CollectionInvoiceTable() {
  const [data, isLoading, pagination] = useGetCollectionInvoice();

  const invoiceTableFormat: TableFormatType[] = useMemo(
    () => [
      {
        label: "Invoice No",
        colKey: "invoice_no",
      },
      {
        label: "Delivery date",
        colKey: "delivery_date",
      },
      {
        label: "Customer",
        colKey: "customer.name",
      },
      {
        label: "Currency",
        colKey: "currency",
      },
      {
        label: "Type",
        colKey: "sales_type",
      },

      {
        label: "Status",
        colKey: "total",
        customRender: (val: Invoice) => (
          <Center>
            <StatusRenderer status={val?.status ?? "None"} colors={statusColors} />
          </Center>
        ),
      },
    ],
    [],
  );

  return (
    <Flex className="flex-grow" mt={24} direction="column">
      <Flex align="center" justify="space-between" mb={8}>
        <Title size="h3"> Invoices</Title>
      </Flex>
      <Table
        data={data}
        isLoading={isLoading}
        format={invoiceTableFormat}
        pagination={pagination}
      />
    </Flex>
  );
}

export default CollectionInvoiceTable;
