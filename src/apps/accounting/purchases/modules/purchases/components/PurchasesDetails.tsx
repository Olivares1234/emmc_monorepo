import { useMemo } from "react";
import { Description } from "common/components/description";
import { DescriptionFormat } from "common/components/description/types";
import dayjs from "dayjs";

import { Purchases } from "../types";

import PurchasesStatus from "./PurchasesStatus";

interface Props {
  data: Purchases;
}

function PurchasesDetails({ data }: Props) {
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
        customRender: () => <PurchasesStatus status={data.status} />,
      },
      {
        key: "accounts.title",
        label: "Account Code",
      },
      {
        key: "accounts.title",
        label: "Account title",
      },
      {
        key: "currency",
        label: "Currency",
      },
      {
        key: "total",
        label: "Amount",
      },
      {
        key: "invoice_date",
        label: "Date",
        customRender: () => dayjs(data?.invoice_date).format("MM-DD-YYYY"),
      },
      {
        key: "sales_type",
        label: "Type",
      },

      {
        key: "supplier.name",
        label: "Supplier",
      },
    ],
    [data],
  );

  return <Description data={data} format={descriptionFormat} columns={2} />;
}

export default PurchasesDetails;
