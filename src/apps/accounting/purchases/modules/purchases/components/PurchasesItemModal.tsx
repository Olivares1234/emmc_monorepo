import { useCallback } from "react";
import { Flex, NumberInput, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";

import { useCreateUpdatePurchasesItem } from "../hooks";
import { PurchaseItemModal } from "../types";

import { purchaseItemDefaultValue } from "./constants";
import { itemSchema } from "./schema";

function PurchasesItemModal({ onClose, data }: FormModal<PurchaseItemModal>) {
  const [submit, isLoading] = useCreateUpdatePurchasesItem(data?.purchaseId);

  const form = useForm({
    initialValues: purchaseItemDefaultValue,
    validate: yupResolver(itemSchema),
  });

  const handleSubmit = useCallback(async (value: typeof form.values) => {
    try {
      const updatedValue = {
        ...value,
        purchase_order_no:
          value.purchase_order_no.trim() !== "" ? value.purchase_order_no : "N/A",
        purchase_request_no:
          value.purchase_request_no.trim() !== "" ? value.purchase_request_no : "N/A",
        part_no: value.part_no.trim() !== "" ? value.part_no : "N/A",
        particular: value.particular.trim() !== "" ? value.particular : "N/A",
      };

      await submit(updatedValue);
      onClose();
    } catch (e) {
      //
    }
  }, []);

  return (
    <div className="">
      <Flex direction="column">
        <Form form={form} onSubmit={handleSubmit} className="flex-1 mb-4">
          {(data?.currentItemCount as number) < 1 && (
            <TextInput
              withAsterisk
              label="Delivery receipt"
              {...form.getInputProps("dr_no")}
            />
          )}
          <TextInput
            label="Purchase order no."
            {...form.getInputProps("purchase_order_no")}
          />
          <TextInput label="Particular" {...form.getInputProps("particular")} />
          <TextInput label="Part number" {...form.getInputProps("part_no")} />
          <TextInput
            label="Purchases request no"
            {...form.getInputProps("purchases_request_no")}
          />
          <NumberInput
            withAsterisk
            label="Quantity"
            {...form.getInputProps("quantity")}
          />
          <NumberInput
            withAsterisk
            label="Unit price"
            precision={5}
            {...form.getInputProps("unit_price")}
          />
          <NumberInput
            label="Importation amount"
            precision={5}
            {...form.getInputProps("importation_amount")}
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
    </div>
  );
}

export default PurchasesItemModal;
