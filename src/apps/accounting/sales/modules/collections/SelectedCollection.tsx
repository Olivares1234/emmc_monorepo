import { clsx, Flex, Paper, Title } from "@mantine/core";
import { LoadingWithText } from "common/components/loader";

import CollectionDetails from "./components/CollectionDetails";
import CollectionInvoiceTable from "./components/CollectionInvoiceTable";
import { useGetSingleCollection } from "./hooks";

function SelectedCollection() {
  const [data, isLoading, queryRes] = useGetSingleCollection();

  return (
    <Paper
      withBorder
      p={8}
      shadow="md"
      className={clsx("flex flex-col flex-grow relative")}
    >
      <LoadingWithText text="Loading collection information..." show={isLoading} />
      {!isLoading && !queryRes?.error && (
        <>
          <Flex justify="space-between" align="center" mb={12}>
            <Title size="h3">Collection Details</Title>
          </Flex>
          <CollectionDetails data={data} />
          <CollectionInvoiceTable />
        </>
      )}
    </Paper>
  );
}

export default SelectedCollection;
