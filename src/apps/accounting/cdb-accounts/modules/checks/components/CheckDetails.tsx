import { useMemo } from "react";
import { Description } from "common/components/description";
import { DescriptionFormat } from "common/components/description/types";
import { DateFormat } from "common/types";

import { Check } from "../types";

interface Props {
  data: Check;
}

function CheckDetails({ data }: Props) {
  const descriptionFormat = useMemo<DescriptionFormat[]>(
    () => [
      {
        key: "txNo",
        label: "Transaction No.",
      },
      {
        key: "datePrepared",
        label: "Date prepared",
        formatAsDate: DateFormat.SHORTMONTH,
      },
      {
        key: "checkDate",
        label: "Check Date",
        formatAsDate: DateFormat.SHORTMONTH,
      },
      {
        key: "checkNumber",
        label: "Check Number",
      },
      {
        key: "voucherDate",
        label: "Voucher Date",
        formatAsDate: DateFormat.SHORTMONTH,
      },
      {
        key: "voucherNumber",
        label: "Voucher Number",
      },
      {
        key: "payeesName",
        label: "Payees Name",
      },
    ],
    [data],
  );

  return <Description data={data} format={descriptionFormat} columns={2} />;
}

export default CheckDetails;
