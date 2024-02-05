/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Button, Checkbox, Group, NumberInput, Select } from "@mantine/core";
import { Form } from "@mantine/form";
import { useOperationGetSupplierOptions } from "apps/operations/hooks";
import { AnyObject, FormModal } from "common/types";
import { transformSelectOptData } from "utils/helpers";

import { FLUTE_TYPES, LENGTH_INPUT_TYPE, PAPER_COMBS } from "./constants";
import { useSpecifications } from "./hooks";

function RSC({ onClose }: FormModal<AnyObject>) {
  const [form, handleSubmit] = useSpecifications();
  const [suppliers] = useOperationGetSupplierOptions();
  return (
    <div className="w-full space-x-8">
      <Form className="w-full" form={form}>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <Select
              withAsterisk
              label="Dimension Type"
              data={LENGTH_INPUT_TYPE.map((type) => ({
                label: type,
                value: type,
              }))}
              placeholder={"Select dimension type"}
              {...form.getInputProps("dimensionType")}
              searchable
              className="flex-1"
            />
            <NumberInput
              withAsterisk
              label="MOQ"
              min={0}
              {...form.getInputProps("moq")}
              className="flex-1"
            />
          </div>
          <div className="flex space-x-4">
            <NumberInput
              withAsterisk
              min={0}
              label="Length"
              {...form.getInputProps("length")}
              className="flex-1"
            />
            <NumberInput
              withAsterisk
              label="Width"
              min={0}
              {...form.getInputProps("width")}
              className="flex-1"
            />
            <NumberInput
              withAsterisk
              label="Height"
              min={0}
              {...form.getInputProps("height")}
              className="flex-1"
            />
          </div>
          <div className="flex space-x-4">
            <Select
              withAsterisk
              label="Flute"
              data={transformSelectOptData(FLUTE_TYPES, {
                valueKey: "flute",
                labelKey: "flute",
              })}
              placeholder={"Select flute"}
              {...form.getInputProps("flute")}
              searchable
              className="w-full"
            />
            <Select
              withAsterisk
              label="Paper Combination"
              data={PAPER_COMBS.map((pc) => ({
                label: pc,
                value: pc,
              }))}
              placeholder={"Select paper combination"}
              {...form.getInputProps("paperCombination")}
              searchable
              className="w-full"
            />
          </div>
          <div className="flex space-x-4">
            <NumberInput
              withAsterisk
              label="Material Length"
              precision={3}
              min={0}
              {...form.getInputProps("materialLength")}
              className="flex-1"
            />
            <NumberInput
              withAsterisk
              label="Material Width"
              precision={3}
              min={0}
              {...form.getInputProps("materialWidth")}
              className="flex-1"
            />
          </div>
          <div className="flex space-x-4">
            <NumberInput
              label="Material Length(inches)"
              min={0}
              {...form.getInputProps("materialLengthInches")}
              className="flex-1"
              precision={3}
              disabled
            />
            <NumberInput
              min={0}
              label="Material Width(inches)"
              precision={3}
              {...form.getInputProps("materialWidthInches")}
              className="flex-1"
              disabled
            />
          </div>
          <Checkbox
            label="Use Common board"
            defaultChecked={false}
            {...form.getInputProps("useCommonBoard")}
            className="flex-1"
          />
          <div className="flex space-x-4">
            <NumberInput
              label="Yield 1"
              min={0}
              {...form.getInputProps("yieldOne")}
              className="flex-1"
              disabled
            />
            <NumberInput
              min={0}
              label="Yield 2"
              {...form.getInputProps("yieldTwo")}
              className="flex-1"
              disabled
            />
          </div>
          <div className="flex space-x-4">
            <Select
              withAsterisk
              label="Supplier"
              data={suppliers}
              placeholder={"Select supplier"}
              {...form.getInputProps("supplierId")}
              searchable
              className="flex-1"
            />
            <NumberInput
              min={0}
              label="Buying price"
              {...form.getInputProps("buyingPrice")}
              className="flex-1"
            />
          </div>
          <div className="flex space-x-4">
            <NumberInput
              min={0}
              precision={3}
              label="Material Price"
              {...form.getInputProps("materialPrice")}
              className="flex-1"
              disabled
            />
            <NumberInput
              min={0}
              precision={3}
              label="Material Price w/ 5% allocation"
              {...form.getInputProps("materialPriceWithAllocation")}
              className="flex-1"
              disabled
            />
          </div>
        </div>
      </Form>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => form.onSubmit(handleSubmit)()} color="teal" size="sm">
          Next step
        </Button>
      </Group>
    </div>
  );
}

export default RSC;
