import { useCallback } from "react";
import { Flex, NumberInput, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";

import { useCreateUpdateInvoiceItem } from "../hooks";

import { invoiceItemDefaultValue } from "./constants";
import { itemSchema } from "./schemas";

function InvoiceItemModal({ onClose, data }: FormModal<number>) {
  const [submit, isLoading] = useCreateUpdateInvoiceItem(data as number);

  const form = useForm({
    initialValues: invoiceItemDefaultValue,
    validate: yupResolver(itemSchema),
  });

  const handleSubmit = useCallback(async (value: typeof form.values) => {
    try {
      const partNumber = value.part_no.trim() !== "" ? value.part_no : "N/A";
      const updatedValue = { ...value, part_no: partNumber };
      await submit(updatedValue);
      onClose();
    } catch (e) {
      //
    }
  }, []);

  return (
    <Flex direction="column">
      <Form form={form} onSubmit={handleSubmit} className="flex-1 mb-4">
        <TextInput label="Delivery receipt" {...form.getInputProps("dr_no")} />
        <TextInput
          withAsterisk
          label="Purchase order no."
          {...form.getInputProps("purchase_order_no")}
        />
        <TextInput
          withAsterisk
          label="Particular"
          {...form.getInputProps("particular")}
        />
        <TextInput label="Part number" {...form.getInputProps("part_no")} />
        <NumberInput withAsterisk label="Quantity" {...form.getInputProps("quantity")} />
        <NumberInput
          withAsterisk
          label="Unit price"
          precision={5}
          {...form.getInputProps("unit_price")}
        />
        <TextInput label="Remarks" {...form.getInputProps("remarks")} />
      </Form>
      <ModalButtons
        okType="button"
        onOk={form.onSubmit(handleSubmit)}
        isLoading={isLoading}
        onCancel={onClose}
      />
    </Flex>
  );
}

export default InvoiceItemModal;
