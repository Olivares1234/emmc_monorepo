import { useMemo } from "react";
import { Flex } from "@mantine/core";
import { Description } from "common/components/description";
import { DescriptionFormat } from "common/components/description/types";

const testData = {
  official_receipt_no: "OR-123",
  ar_no: "AR-123",
  collection_date: "Jan 1, 1990",
  withholding_tax: 0,
  check_no: "CHECK-00000",
  payment_method: "Check",
};

function PaymentsData() {
  const descriptionFormat = useMemo<DescriptionFormat[]>(
    () => [
      {
        key: "official_receipt_no",
        label: "Official receipt",
      },
      {
        key: "ar_no",
        label: "Acknowledgement receipt",
      },
      {
        key: "withholding_tax",
        label: "Withholding Tax",
      },

      {
        key: "collection_date",
        label: "Collection Date",
      },
      {
        key: "payment_method",
        label: "Payment method",
      },
      {
        key: "check_no",
        label: "Check No",
      },
    ],
    [],
  );

  return (
    <Flex mt={24}>
      <Description data={testData} format={descriptionFormat} columns={2} />
    </Flex>
  );
}

export default PaymentsData;
