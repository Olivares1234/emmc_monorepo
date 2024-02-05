import { useCallback } from "react";
import { MultiSelect, NumberInput, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { Table } from "common/components/table";
import { AnyObject, FormModal } from "common/types";
import { convertDateToLocale, removeEmpty } from "utils/helpers";

import { useGetCustomerOptions } from "../../customers/hooks";
import { useGetInvoiceOptions, useGetInvoiceTotals } from "../../invoices/hooks";
import { InvoiceTotal } from "../../invoices/types";
// import { removeEmpty } from "utils/helpers";
import { useCreateUpdateInvoiceCollection } from "../hooks";

import {
  collectionDefaultValue,
  collectionSchema,
  paymentMethodOpt,
  totalTableFormat,
  withholdingTaxOpt,
} from "./constants";

function CollectionModal({
  onClose,
  isInvoicePage,
}: FormModal & { isInvoicePage?: boolean }) {
  const [customers] = useGetCustomerOptions();

  const form = useForm<typeof collectionDefaultValue>({
    initialValues: collectionDefaultValue,
    validate: yupResolver(collectionSchema),
  });
  const [invoiceDetails, isFetchingInfo] = useGetInvoiceTotals(form.values.invoice_ids);
  console.log(form.values.invoice_ids);
  const [invoiceOpt] = useGetInvoiceOptions(form.values.customer);
  const [submit, isLoading] = useCreateUpdateInvoiceCollection(null, isInvoicePage);

  const handleSubmit = useCallback(async (value: AnyObject) => {
    try {
      await submit(
        removeEmpty({
          ...value,
          withholding_tax: +value.withholding_tax,
          collection_date: convertDateToLocale(value?.collection_date),
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
        <div className="flex space-x-2">
          <div className="w-1/2">
            <Select
              withAsterisk
              data={customers}
              label="Customer"
              placeholder="Select"
              {...form.getInputProps("customer")}
              onChange={(val) => {
                form.setFieldValue("customer", val as string);
                form.setFieldValue("invoice_ids", []);
              }}
            />
            <DateInput
              withAsterisk
              label="Collection Date"
              placeholder="MM-DD-YYYY"
              valueFormat="MM-DD-YYYY"
              clearable
              maxDate={new Date()}
              {...form.getInputProps("collection_date")}
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
              <>
                <TextInput
                  withAsterisk
                  label="Bank name"
                  placeholder="Bank name"
                  {...form.getInputProps("bank_name")}
                />
                <NumberInput
                  withAsterisk
                  label="Bank Charge"
                  placeholder="Bank Charge"
                  precision={4}
                  min={0}
                  {...form.getInputProps("bank_charge")}
                />
              </>
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
              data={invoiceOpt}
              placeholder="Select"
              {...form.getInputProps("invoice_ids")}
            />
          </div>
          <div className="flex flex-col flex-grow">
            <Table<InvoiceTotal>
              data={invoiceDetails}
              isLoading={isFetchingInfo}
              showTotal={{
                precision: 4,
                columnKeys: ["totals"],
              }}
              format={totalTableFormat}
            />
          </div>
        </div>
        <ModalButtons isLoading={isLoading} onCancel={onClose} />
      </div>
    </Form>
  );
}

export default CollectionModal;
