import { useCallback } from "react";
import { Flex, MultiSelect, Select, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";
import { useGetApprovers } from "hooks/useGetApprovers";

import { useCreateEditInvoice } from "../hooks";
import { Invoice } from "../types";

import { currencyOpt } from "./constants";
import { updateInvoiceSchema } from "./schemas";

function InvoiceUpdateModal({ onClose, data }: FormModal<Invoice>) {
  const [submit, isLoading] = useCreateEditInvoice(data?.id);
  const [options] = useGetApprovers();
  const form = useForm({
    initialValues: {
      ...data,
      delivery_date: new Date(data?.delivery_date as string),
      approvers: [],
    },
    validate: yupResolver(updateInvoiceSchema),
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
        <TextInput
          withAsterisk
          label="Invoice No"
          placeholder="XX-XXXXXX"
          {...form.getInputProps("invoice_no")}
        />
        <DateInput
          withAsterisk
          label="Delivery Date"
          placeholder="MM-DD-YYYY"
          valueFormat="MM-DD-YYYY"
          clearable
          maxDate={new Date()}
          {...form.getInputProps("delivery_date")}
        />
        <Select
          withAsterisk
          data={currencyOpt}
          label="Currency"
          {...form.getInputProps("currency")}
        />
        <MultiSelect
          withAsterisk
          data={options}
          searchable
          label="Approvers"
          {...form.getInputProps("approvers")}
          max={1}
        />
        <Textarea
          withAsterisk
          placeholder="Reason for updating"
          label="Remarks"
          {...form.getInputProps("description")}
        />
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

export default InvoiceUpdateModal;
