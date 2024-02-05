import { clsx, Flex, Paper, Title } from "@mantine/core";
import { LoadingWithText } from "common/components/loader";

import PaymentseDtails from "./components/PaymentsDetails";
import PaymentsPOTable from "./components/PaymentsPOTable";
import { useGetSinglePayments } from "./hooks";

function SelectedPayments() {
  const [data, isLoading, queryRes] = useGetSinglePayments();

  return (
    <Paper
      withBorder
      p={8}
      shadow="md"
      className={clsx("flex flex-col flex-grow relative")}
    >
      <LoadingWithText text="Loading payments information..." show={isLoading} />
      {!isLoading && !queryRes?.error && (
        <>
          <Flex justify="space-between" align="center" mb={12}>
            <Title size="h3">Payments Details</Title>
          </Flex>
          <PaymentseDtails data={data} />
          <PaymentsPOTable />
        </>
      )}
    </Paper>
  );
}

export default SelectedPayments;
