import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Flex, Paper } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { Description } from "common/components/description";
import { DescriptionFormat } from "common/components/description/types";
import { LoadingWithText } from "common/components/loader";
import { NoData } from "common/no-data";
import dayjs from "dayjs";

import { useGetSingleCollection } from "../../collections/hooks";
import { INVOICE_INFO } from "../constants";
import { Invoice } from "../types";

function CollectionData() {
  const { id } = useParams();
  const client = useQueryClient();
  const invoiceData = client.getQueryData<Invoice>([INVOICE_INFO, id]);
  const [data, isLoading] = useGetSingleCollection(invoiceData?.collection_id, false);

  const descriptionFormat = useMemo<DescriptionFormat[]>(
    () => [
      {
        key: "official_receipt_no",
        label: "Official receipt no.",
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
        customRender: () => data?.withholding_tax ?? 0 / 100,
      },
      {
        key: "_count.invoices",
        label: "Invoice count",
      },
      {
        key: "total",
        label: "Total Amount",
        customRender: () => data?.total?.toFixed(4) ?? 0,
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

export default CollectionData;
