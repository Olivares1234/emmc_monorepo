import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Flex, Paper } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { Description } from "common/components/description";
import { DescriptionFormat } from "common/components/description/types";
import { LoadingWithText } from "common/components/loader";
import { NoData } from "common/no-data";
import dayjs from "dayjs";

import { useGetSinglePayments } from "../../payments/hooks";
import { PURCHASES_INFO } from "../constants";
import { Purchases } from "../types";

function PaymentData() {
  const { id } = useParams();
  const client = useQueryClient();
  const purchaseOrderData = client.getQueryData<Purchases>([PURCHASES_INFO, id]);
  const [data, isLoading] = useGetSinglePayments(
    purchaseOrderData?.purchases_payments_id,
    false,
  );

  const descriptionFormat = useMemo<DescriptionFormat[]>(
    () => [
      {
        key: "official_receipt_no",
        label: "Official receipt no.",
      },
      {
        key: "date_received",
        label: "Payment Date",
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
        customRender: () => data?.withholding_tax ?? 0 / 100,
      },
      {
        key: "_count.purchase_invoice",
        label: "Purchase order count",
      },
      {
        key: "total",
        label: "Total Amount",
      },
    ],
    [data],
  );

  if (!isLoading && !data)
    return (
      <Paper className="flex-grow flex items-center">
        <NoData message="No Collection Data" />
      </Paper>
    );

  return (
    <Flex mt={24} className="relative">
      <LoadingWithText text="Loading collection information..." show={isLoading} />
      {!isLoading && (
        <Description data={data ?? {}} format={descriptionFormat} columns={2} />
      )}
    </Flex>
  );
}

export default PaymentData;
