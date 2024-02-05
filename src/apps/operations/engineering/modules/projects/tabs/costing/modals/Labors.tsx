import { useCallback, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import { Button, Flex, Group, MultiSelect, NumberInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import get from "lodash.get";
import { startCase } from "utils/helpers";

import { laborsOpt } from "./constants";
import { useCostingContext } from "./context";
import { laborsSchema } from "./schema";
import { Labor, LaborsForm } from "./types";

function Labors() {
  const {
    nextStep,
    prevStep,
    setLaborsValue,
    labors: laborsDefault,
  } = useCostingContext();

  const form = useForm<LaborsForm>({
    initialValues: laborsDefault,
    validate: yupResolver(laborsSchema),
  });
  const { labors } = form.values;

  const handleSubmit = useCallback(
    async (value: LaborsForm) => {
      nextStep();
      setLaborsValue({
        ...value,
        skip: false,
      });
    },
    [nextStep, setLaborsValue],
  );

  const handleOnSkip = useCallback(() => {
    nextStep();
    setLaborsValue({
      skip: true,
      labors: [],
    });
  }, [nextStep, setLaborsValue]);

  const selectedLabors = useMemo(() => labors.map((d: any) => d.name), [labors]);

  const handleLaborsChange = (selectedItems: any) => {
    if (selectedItems.length < selectedLabors.length) {
      const deletedLabor = selectedLabors.filter(
        (d: string) => !selectedItems.includes(d),
      );
      deletedLabor.forEach((name: string) => {
        form.setFieldValue(
          "labors",
          labors.filter((l) => l.name !== name),
        );
      });
      return;
    }

    const newDiff = selectedItems.filter((d: string) => !selectedLabors.includes(d));
    newDiff.forEach((name: string) => {
      form.setFieldValue("labors", [
        ...labors,
        {
          label: startCase(name),
          name,
          value: 0,
        },
      ]);
    });
  };

  const laborList = useMemo(() => {
    return labors.map((labor: Labor, k: any) => (
      <Flex key={labor.name} justify="space-between" align="flex-start" columnGap={6}>
        <NumberInput
          label={labor.label}
          precision={3}
          min={0}
          value={labors[k].value ?? 0}
          onChange={(value) => {
            form.setFieldValue(`labors.${k}.value`, Number(value) > 0 ? value : 0);
          }}
          error={get(form.errors, `labors.${k}.value`)}
          className="flex-1"
        />
        <Button
          color="red"
          mt={26}
          onClick={() =>
            form.setFieldValue(
              "labors",
              labors.filter((l) => l.name !== labor.name),
            )
          }
          variant="outline"
          size="sm"
        >
          <FaTimes size={8} />
        </Button>
      </Flex>
    ));
  }, [labors, form.errors]);

  const totalLabors = useMemo(
    () => labors.reduce((prev: number, curr) => prev + curr.value ?? 0, 0),
    [labors],
  );

  return (
    <Flex direction="column">
      <div className="flex space-x-4">
        <div className="flex flex-col flex-1 space-y-2">
          <MultiSelect
            label="Labors"
            data={laborsOpt.map((labor) => ({
              value: labor,
              label: startCase(labor),
            }))}
            placeholder="Select"
            {...form.getInputProps("labors")}
            value={selectedLabors}
            onChange={handleLaborsChange}
          />
          {laborList}
          <NumberInput
            label="Total"
            precision={3}
            min={0}
            value={totalLabors}
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
    </Flex>
  );
}

export default Labors;
