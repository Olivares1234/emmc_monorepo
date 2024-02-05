import { useCallback, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import { Button, Flex, Group, MultiSelect, NumberInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import get from "lodash.get";
import { startCase } from "utils/helpers";

import { consumablesOpt } from "./constants";
import { useCostingContext } from "./context";
import { consumablesSchema } from "./schema";
import { ConsumablesForm } from "./types";

function Consumables() {
  const {
    nextStep,
    prevStep,
    consumables: consumablesDefault,
    setConsumablesValue,
  } = useCostingContext();

  const handleSubmit = useCallback(
    async (value: ConsumablesForm) => {
      nextStep();
      setConsumablesValue({
        ...value,
        skip: false,
      });
    },
    [nextStep, setConsumablesValue],
  );

  const handleOnSkip = useCallback(() => {
    nextStep();
    setConsumablesValue({
      skip: true,
      consumables: [],
    });
  }, [nextStep, setConsumablesValue]);

  const form = useForm<ConsumablesForm>({
    initialValues: consumablesDefault,
    validate: yupResolver(consumablesSchema),
  });
  const { consumables } = form.values;

  const selectedConsumables = useMemo(
    () => consumables.map((d: any) => d.name),
    [consumables],
  );

  const handlePrintingChange = (selectedItems: string[]) => {
    if (selectedItems.length < selectedConsumables.length) {
      const deletedLabor = selectedConsumables.filter(
        (d: string) => !selectedItems.includes(d),
      );
      deletedLabor.forEach((name: string) => {
        form.setFieldValue(
          "consumables",
          consumables.filter((l) => l.name !== name),
        );
      });
      return;
    }

    const newDiff = selectedItems.filter((d: string) => !selectedConsumables.includes(d));
    newDiff.forEach((name: string) => {
      form.setFieldValue("consumables", [
        ...consumables,
        {
          label: startCase(name),
          name,
          value: 0,
        },
      ]);
    });
  };

  const printingList = useMemo(
    () =>
      consumables.map((consumable: any, k: any) => (
        <Flex
          key={consumable.name}
          justify="space-between"
          align="flex-start"
          columnGap={6}
        >
          <NumberInput
            key={consumable.name}
            label={consumable.label}
            precision={3}
            min={0}
            value={consumables[k].value}
            onChange={(value) => {
              form.setFieldValue(`consumables.${k}.value`, Number(value) > 0 ? value : 0);
            }}
            error={get(form.errors, `consumables.${k}.value`)}
            className="flex-1"
          />
          <Button
            color="red"
            mt={26}
            onClick={() =>
              form.setFieldValue(
                "consumables",
                consumables.filter((c) => c.name !== consumable.name),
              )
            }
            variant="outline"
            size="sm"
          >
            <FaTimes size={8} />
          </Button>
        </Flex>
      )),
    [consumables, form.errors],
  );

  const totalConsumables = useMemo(
    () => consumables.reduce((prev: number, curr) => prev + curr.value ?? 0, 0),
    [consumables],
  );

  // useEffect(() => {
  //   const totalPrinting =
  //     safetyZero(cyrill) +
  //     safetyZero(ink) +
  //     safetyZero(varnish) +
  //     safetyZero(adhesiveStaple) +
  //     safetyZero(plasticStraw);
  //   form.setFieldValue("totalPrinting", totalPrinting);
  // }, [cyrill, ink, varnish, adhesiveStaple, plasticStraw]);

  // useEffect(() => {
  //   const totalCost =
  //     safetyZero(toolingBlade) +
  //     safetyZero(overhead) +
  //     safetyZero(safetyFactor) +
  //     safetyZero(others);
  //   form.setFieldValue("totalCost", totalCost);
  // }, [toolingBlade, overhead, safetyFactor, others]);

  // useEffect(() => {
  //   const totalSafety = safetyZero(materialPriceWithAllocation) + safetyZero(totalLabor);
  //   form.setFieldValue("safetyFactor", totalSafety);
  // }, [materialPriceWithAllocation, totalLabor]);

  // useEffect(() => {
  //   const overhead = 800 / (moq > 0 ? moq : 1);
  //   form.setFieldValue("overhead", overhead);
  // }, [moq]);

  // useEffect(() => {
  //   const totalBasedCost =
  //     safetyZero(totalLabor) + safetyZero(totalPrinting) + safetyZero(totalCost);
  //   form.setFieldValue("totalBasedCost", totalBasedCost);
  //   form.setFieldValue("totalBasedCostUsd", totalBasedCost / 45);
  // }, [totalLabor, totalPrinting, totalCost]);

  return (
    <Flex direction="column">
      <div className="flex space-x-4">
        <div className="flex flex-col flex-1 space-y-2">
          <MultiSelect
            {...form.getInputProps("consumables")}
            data={consumablesOpt.map((consumable) => ({
              value: consumable,
              label: startCase(consumable),
            }))}
            label="Consumables"
            placeholder="Select"
            value={selectedConsumables}
            onChange={handlePrintingChange}
          />
          {printingList}
          <NumberInput
            label="Total"
            precision={3}
            min={0}
            value={totalConsumables}
            className="flex-1"
            disabled
          />
        </div>
      </div>
      <Flex justify="space-between" mt="xl">
        <Button onClick={handleOnSkip} color="red">
          Skip
        </Button>
        <Group>
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={() => form.onSubmit(handleSubmit)()} color="teal" size="sm">
            Next step
          </Button>
        </Group>
      </Flex>
      {/* <div className="flex flex-col flex-1 space-y-2 mt-3">
        <Title size="h4">Others</Title>
        <div className="flex space-x-4">
          <NumberInput
            label="Tooling blade"
            precision={3}
            min={0}
            {...form.getInputProps("toolingBlade")}
            className="flex-1"
          />
          <NumberInput
            label="Overhead"
            precision={3}
            min={0}
            {...form.getInputProps("overhead")}
            className="flex-1"
            disabled
          />
        </div>
        <div className="flex space-x-4">
          <NumberInput
            label="10% Safety factor"
            precision={3}
            min={0}
            {...form.getInputProps("safetyFactor")}
            className="flex-1"
            disabled
          />
          <NumberInput
            label="Others"
            precision={3}
            min={0}
            {...form.getInputProps("others")}
            className="flex-1"
          />
        </div>
        <Title size="h4">Total</Title>
        <div className="flex space-x-4">
          <NumberInput
            label="Total based cost"
            precision={3}
            min={0}
            {...form.getInputProps("totalBasedCost")}
            className="flex-1"
            disabled
          />
          <NumberInput
            label="Total based cost(USD)"
            precision={3}
            min={0}
            {...form.getInputProps("totalBasedCostUsd")}
            className="flex-1"
            disabled
          />
        </div>
      </div> */}
    </Flex>
  );
}

export default Consumables;
