import { Button, Flex, Group, Title } from "@mantine/core";
import { Description } from "common/components/description";
import { Table } from "common/components/table";
import { FormModal } from "common/types";
import { preparePayloadForRequest } from "utils/helpers";

import { useCreateEditCosting } from "../hooks";

import { consumableTableFormat, laborTableFormat } from "./constants";
import { useCostingContext } from "./context";
import { RSC_DESCRIPTION_FORMAT } from "./datasets";

function Overview({ onClose }: FormModal) {
  const { labors, consumables, prevStep, specifications, projectId, costingId } =
    useCostingContext();
  const [submit, isLoading] = useCreateEditCosting(costingId);

  const handleSubmit = async () => {
    try {
      const payload = preparePayloadForRequest({
        ...specifications,
        projectId,
        labors: labors.labors,
        consumables: consumables.consumables,
      });
      await submit(payload);
      onClose();
    } catch (_e) {
      //
    }
  };

  return (
    <Flex direction="column" rowGap={25}>
      <Description columns={2} data={specifications} format={RSC_DESCRIPTION_FORMAT} />
      {!labors.skip && (
        <Flex direction="column" mih={100}>
          <Title size="h4">Labors</Title>
          <Table data={labors.labors} format={laborTableFormat} noScroll />
        </Flex>
      )}
      {!consumables.skip && (
        <Flex direction="column" mih={100}>
          <Title size="h4">Consumables</Title>
          <Table data={consumables.consumables} format={consumableTableFormat} noScroll />
        </Flex>
      )}
      <Group position="right">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleSubmit} color="teal" size="sm" loading={isLoading}>
          {`${costingId ? "Update" : "Create"} Costing`}
        </Button>
      </Group>
    </Flex>
  );
}

export default Overview;
