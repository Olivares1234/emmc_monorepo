import { useCallback } from "react";
import { Flex, NumberInput, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { AnyObject, FormModal } from "common/types";
import { convertNullEmpty, pick } from "utils/helpers";

import { useCreateUpdateInvoiceItem } from "../hooks";
import { InvoiceItem } from "../types";

import { noteOpt } from "./constants";
import { updateItemSchema } from "./schemas";

function InvoiceItemUpdate({ onClose, data }: FormModal<InvoiceItem>) {
  const [submit, isLoading] = useCreateUpdateInvoiceItem(data?.invoice_id);

  const form = useForm({
    initialValues: pick(
      ["unit_price", "id", "note", "note_amount", "note_type"],
      convertNullEmpty(data as AnyObject),
    ),

    validate: yupResolver(updateItemSchema),
  });

  const handleSubmit = useCallback(async (value: typeof form.values) => {
    try {
      await submit(value);
      onClose();
    } catch (e) {
      //
    }
  }, []);

  return (
    <Flex direction="column">
      <Form form={form} onSubmit={handleSubmit} className="flex-1 mb-4">
        <NumberInput
          label="Unit price"
          precision={5}
          value={form.values.unit_price}
          disabled
        />
        <Select
          withAsterisk
          label="Note type"
          placeholder="Select"
          data={noteOpt}
          {...form.getInputProps("note_type")}
        />
        <TextInput
          withAsterisk
          label="Note No"
          placeholder="00-000-00"
          {...form.getInputProps("note")}
        />
        <NumberInput
          withAsterisk
          label="Note Amount"
          precision={5}
          min={0}
          max={form.values.unit_price}
          {...form.getInputProps("note_amount")}
        />
        <NumberInput
          label="New unit price"
          precision={5}
          disabled
          min={0}
          max={form.values.unit_price}
          value={
            form.values.note_type === "Debit"
              ? Number(form?.values?.unit_price) - Number(form?.values?.note_amount)
              : Number(form?.values?.unit_price) + Number(form?.values?.note_amount)
          }
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

export default InvoiceItemUpdate;
