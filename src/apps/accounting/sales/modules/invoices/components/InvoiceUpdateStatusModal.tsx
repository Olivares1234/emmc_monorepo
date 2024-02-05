import { useCallback } from "react";
import { Flex, MultiSelect, Select, Textarea } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";
import { useGetApprovers } from "hooks/useGetApprovers";

import { useUpdateInvoiceStatus } from "../hooks";
import { InvoiceStatus } from "../types";

import { filterStatusOptions } from "./constants";
import { updateInvoiceStatusSchema } from "./schemas";
import { InvoiceUpdateStatusForm, InvoiceUpdateStatusProps } from "./types";

function InvoiceUpdateStatusModal({
  onClose,
  data,
}: FormModal<InvoiceUpdateStatusProps>) {
  const [submit, isLoading] = useUpdateInvoiceStatus(data?.id);
  const [options] = useGetApprovers();
  const form = useForm<InvoiceUpdateStatusForm>({
    initialValues: {
      approvers: [],
      description: "",
      status: "" as InvoiceStatus,
    },
    validate: yupResolver(updateInvoiceStatusSchema),
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
        <Select
          withAsterisk
          data={filterStatusOptions.filter(
            ({ value }) => value !== InvoiceStatus.Collected && value !== data?.status,
          )}
          searchable
          label="New Status"
          {...form.getInputProps("status")}
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

export default InvoiceUpdateStatusModal;
