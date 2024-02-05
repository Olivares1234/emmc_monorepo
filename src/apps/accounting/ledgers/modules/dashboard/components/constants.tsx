import { Center } from "@mantine/core";
import { statusColors } from "apps/accounting/sales/modules/collections/components/constants";
import { Invoice } from "apps/accounting/sales/modules/invoices/types";
import { StatusRenderer } from "common/components/description";
import { TableFormatType } from "common/components/table/types";

export const invoiceTableFormat: TableFormatType[] = [
  {
    label: "Sundry Accounts",
    colKey: "sundry",
  },
  {
    label: "Checks",
    colKey: "checks",
  },
  {
    label: "Reports",
    colKey: "reports",
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
