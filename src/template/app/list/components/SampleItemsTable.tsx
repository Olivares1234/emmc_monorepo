import { useMemo } from "react";
import { Flex, Title } from "@mantine/core";
import { useGetCollectionInvoice } from "apps/accounting/sales/modules/collections/hooks";
// import { Invoice } from "apps/accounting/sales/modules/invoices/types";
// import StatusRenderer from "common/components/description/StatusRenderer";
import { Table } from "common/components/table";
import { TableFormatType } from "common/components/table/types";

// import { statusColors } from "./constants";

function SampleItemsTable() {
  const [data, isLoading, pagination] = useGetCollectionInvoice();

  const invoiceTableFormat: TableFormatType[] = useMemo(
    () => [
      {
        label: "Sample",
        colKey: "sample",
      },

      {
        label: "Status",
        colKey: "total",
        // customRender: (val: Invoice) => (
        //   <Center>
        //     <StatusRenderer status={val?.status ?? "None"} colors={statusColors} />
        //   </Center>
        // ),
      },
    ],
    [],
  );

  return (
    <Flex className="flex-grow" mt={24} direction="column">
      <Flex align="center" justify="space-between" mb={8}>
        <Title size="h3"> Sample</Title>
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

export default SampleItemsTable;
