import { useMemo } from "react";
import { Description } from "common/components/description";
import { DescriptionFormat } from "common/components/description/types";
import dayjs from "dayjs";

import { Invoice } from "../types";

import InvoiceStatus from "./InvoiceStatus";

interface Props {
  data: Invoice;
}

function InvoiceDetails({ data }: Props) {
  const descriptionFormat = useMemo<DescriptionFormat[]>(
    () => [
      {
        key: "invoice_no",
        label: "Invoice No.",
      },
      {
        key: "tx_no",
        label: "Transaction No.",
      },
      {
        key: "status",
        label: "Status",
        customRender: () => <InvoiceStatus status={data.status} />,
      },
      {
        key: "currency",
        label: "Currency",
      },
      {
        key: "total",
        label: "Amount",
        customRender: () => data?.total?.toFixed(4) ?? 0,
      },
      {
        key: "delivery_date",
        label: "Delivery Date",
        customRender: () => dayjs(data?.delivery_date).format("MM-DD-YYYY"),
      },
      {
        key: "sales_type",
        label: "Type",
      },

      {
        key: "customer.name",
        label: "Customer",
      },
      {
        key: "note_type",
        label: "Note",
        customRender: () => data?.note,
      },
    ],
    [data],
  );

  return <Description data={data} format={descriptionFormat} columns={2} />;
}

export default InvoiceDetails;
