import { useCallback } from "react";
import { MultiSelect, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";
import { convertDateToLocale, removeEmpty } from "utils/helpers";

import { useGetPurchasesOptions } from "../../purchases/hooks";
import { useGetSuplierOptions } from "../../supplier/hooks";
// import { removeEmpty } from "utils/helpers";
import { useCreateUpdatePurchaseOrderPayments } from "../hooks";

import { paymentMethodOpt, paymentsDefaultValue, withholdingTaxOpt } from "./constants";
import { paymentsSchema } from "./schema";

function PaymentsModal({
  onClose,
  isPaymentPage,
}: FormModal & { isPaymentPage?: boolean }) {
  const [suppliers] = useGetSuplierOptions();

  const form = useForm<typeof paymentsDefaultValue>({
    initialValues: paymentsDefaultValue,
    validate: yupResolver(paymentsSchema),
  });
  const [purchaseOrderOpt] = useGetPurchasesOptions(form.values.supplier);

  const [submit, isLoading] = useCreateUpdatePurchaseOrderPayments(null, isPaymentPage);

  const handleSubmit = useCallback(async (value: typeof form.values) => {
    try {
      await submit(
        removeEmpty({
          ...value,
          withholding_tax: +value.withholding_tax,
          payment_date: convertDateToLocale(value?.payment_date as unknown as Date),
        }),
      );
      onClose();
    } catch (e) {
      //
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit} className="w-full" form={form}>
      <div className="flex flex-col space-y-3">
        <Select
          withAsterisk
          data={suppliers}
          label="Supplier"
          placeholder="Select"
          {...form.getInputProps("supplier")}
        />
        <DateInput
          withAsterisk
          label="Payment Date"
          placeholder="MM-DD-YYYY"
          valueFormat="MM-DD-YYYY"
          clearable
          maxDate={new Date()}
          {...form.getInputProps("payment_date")}
        />
        <TextInput
          withAsterisk
          label="OR No"
          placeholder="XX-XXXXXX"
          {...form.getInputProps("official_receipt_no")}
        />

        <TextInput
          label="AR No"
          placeholder="XX-XXXXXX"
          {...form.getInputProps("ar_no")}
        />

        <Select
          withAsterisk
          data={paymentMethodOpt}
          label="Payment method"
          placeholder="Select"
          {...form.getInputProps("payment_method")}
        />
        {(form.values.payment_method === "Bank" ||
          form.values.payment_method === "Check") && (
          <TextInput
            withAsterisk
            label="Bank name"
            placeholder="Bank name"
            {...form.getInputProps("bank_name")}
          />
        )}

        {form.values.payment_method === "Check" && (
          <TextInput
            withAsterisk
            label="Check"
            placeholder="Check no."
            {...form.getInputProps("check_no")}
          />
        )}
        <Select
          withAsterisk
          label="Withholding"
          data={withholdingTaxOpt}
          placeholder="Select"
          {...form.getInputProps("withholding_tax")}
        />
        <MultiSelect
          withAsterisk
          searchable
          label="Invoice No"
          data={purchaseOrderOpt}
          placeholder="Select"
          {...form.getInputProps("invoice_ids")}
        />
        <ModalButtons isLoading={isLoading} onCancel={onClose} />
      </div>
    </Form>
  );
}

export default PaymentsModal;
