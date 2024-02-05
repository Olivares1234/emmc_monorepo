import { Center } from "@mantine/core";
import { statusColors } from "apps/accounting/sales/modules/collections/components/constants";
import { Invoice } from "apps/accounting/sales/modules/invoices/types";
import { StatusRenderer } from "common/components/description";
import { TableFormatType } from "common/components/table/types";

export const invoiceTableFormat: TableFormatType[] = [
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
];
