import { useMemo } from "react";
import { Description } from "common/components/description";
import { DescriptionFormat } from "common/components/description/types";
import dayjs from "dayjs";

import { Payments } from "../types";

interface Props {
  data: Payments;
}

function PaymentseDtails({ data }: Props) {
  const descriptionFormat = useMemo<DescriptionFormat[]>(
    () => [
      {
        key: "official_receipt_no",
        label: "Official receipt no.",
      },
      {
        key: "tx_no",
        label: "Transaction no.",
      },
      {
        key: "collection_date",
        label: "Collection Date",
        customRender: () => dayjs(data?.collection_date).format("MM-DD-YYYY"),
      },
      {
        key: "ar_no",
        label: "Acknowledgement receipt",
      },
      {
        key: "payment_method",
        label: "Payment method",
      },
      {
        key: "bank_name",
        label: "Bank name",
      },
      {
        key: "check_no",
        label: "Check no.",
      },
      {
        key: "withholding_tax",
        label: "Withholding Tax",
        customRender: () => data.withholding_tax / 100,
      },
      {
        key: "_count.invoices",
        label: "Invoice count",
      },
      {
        key: "total",
        label: "Total Amount",
      },
    ],
    [data],
  );

  return <Description data={data} format={descriptionFormat} columns={2} />;
}

export default PaymentseDtails;
