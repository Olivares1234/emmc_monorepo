import { useCallback, useEffect, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import { Button, Flex, NumberInput, Select, Text, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { Table } from "common/components/table";
import { TableFormatType } from "common/components/table/types";
import { NoData } from "common/no-data";
import { AnyObject, FormModal } from "common/types";
import { calculateTotalAmount, convertDateToLocale, removeEmpty } from "utils/helpers";

import { useGetCustomerOptions } from "../../customers/hooks";
import { useCreateEditInvoice } from "../hooks";
import { InvoiceDefaultvalue } from "../types";

import {
  currencyOpt,
  invoiceDefaultValue,
  invoiceItemDefaultValue,
  salesTypeOpt,
  statusOptions,
} from "./constants";
import { itemSchema, schema } from "./schemas";

function InvoiceModal({ onClose }: FormModal<AnyObject>) {
  const [customerOpt, loadingCustomer] = useGetCustomerOptions(true);
  const [submit, isLoading] = useCreateEditInvoice();

  const form = useForm<InvoiceDefaultvalue>({
    initialValues: invoiceDefaultValue,
    validate: yupResolver(schema),
  });

  const itemForm = useForm({
    initialValues: invoiceItemDefaultValue,
    validate: yupResolver(itemSchema),
  });

  const allowMultipleDr = useMemo<boolean>(() => {
    try {
      if (!form.values.customer) return false;
      const [, isAllow] = form?.values?.customer?.split(":::") ?? [];
      return isAllow === "true";
    } catch (_e) {
      return false;
    }
  }, [form.values.customer]);

  const handleSubmit = useCallback(async (value: AnyObject) => {
    try {
      const [customerId] = value?.customer?.split(":::") ?? [];
      const a = removeEmpty({
        ...value,
        customer_id: +customerId,
        delivery_date: convertDateToLocale(value?.delivery_date),
      });
      await submit(a);
      onClose();
    } catch (e) {
      //
    }
  }, []);

  const handleSubmitItem = useCallback(
    (val: typeof itemForm.values) => {
      const partNumber = val.part_no.trim() !== "" ? val.part_no : "N/A";
      const drNo = val.dr_no.trim() !== "" ? val.dr_no : "N/A";
      const particularItem = val.particular.trim() !== "" ? val.particular : "N/A";

      const updatedVal = {
        ...val,
        part_no: partNumber,
        dr_no: drNo,
        particular: particularItem,
        total: calculateTotalAmount(+val.quantity, +val.unit_price),
      };

      form.setFieldValue("items", form.values.items.concat([updatedVal]));

      if (allowMultipleDr) {
        itemForm.reset();
        return;
      }
      itemForm.setValues({
        ...invoiceItemDefaultValue,
        dr_no: val.dr_no,
      });
    },
    [form, allowMultipleDr],
  );

  const itemTableFormat = useMemo<TableFormatType[]>(
    () => [
      {
        label: "DR No",
        colKey: "dr_no",
      },
      {
        label: "PO No",
        colKey: "purchase_order_no",
      },
      {
        label: "Particular",
        colKey: "particular",
      },
      {
        label: "Part No",
        colKey: "part_no",
      },
      {
        label: "Quantity",
        colKey: "quantity",
      },
      {
        label: "Unit price",
        colKey: "unit_price",
      },
      {
        label: "Amount",
        colKey: "total",
        customRender: (v) => v.total?.toFixed(5),
      },
      {
        colKey: "",
        className: "text-center w-12",
        customRender: (_v, i) => (
          <Button
            color="red"
            size="xs"
            onClick={() => {
              form.setFieldValue(
                "items",
                form.values.items?.filter((_x: AnyObject, k: number) => k !== i),
              );
            }}
          >
            <FaTimes />
          </Button>
        ),
      },
    ],
    [form.values],
  );

  const itemTableData = useMemo<typeof form.values.items>(() => {
    if (form.values.items?.length < 1) return [];
    return form.values.items;
  }, [form.values.items]);

  const isCancelled = useMemo(
    () => form?.values?.status === "Cancelled",
    [form.values?.status],
  );

  useEffect(() => {
    form.setFieldValue("items", []);
  }, [allowMultipleDr]);

  useEffect(() => {
    if (isCancelled) {
      form.setFieldValue("sales_type", "exempt");
      form.setFieldValue("dr_no", "");
      form.setFieldValue("items", []);
    } else {
      form.setFieldValue("sales_type", "");
    }
  }, [isCancelled]);

  return (
    <Flex direction="column">
      <Flex columnGap={20}>
        <Flex w="30%">
          <Form className="w-full" form={form}>
            <Title size="h4">Invoice details</Title>
            <div className="flex flex-col space-y-1">
              <Select
                withAsterisk
                label="Customer"
                data={customerOpt}
                placeholder={loadingCustomer ? "Loading customers..." : "Select customer"}
                {...form.getInputProps("customer")}
                searchable
              />
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
              {!allowMultipleDr && !isCancelled && (
                <TextInput
                  label="Delivery receipt"
                  disabled={allowMultipleDr}
                  {...itemForm.getInputProps("dr_no")}
                />
              )}
              {!isCancelled && (
                <Select
                  withAsterisk
                  label="Sales Type"
                  placeholder="Select"
                  data={salesTypeOpt}
                  {...form.getInputProps("sales_type")}
                />
              )}
              <Select
                withAsterisk
                label="Status"
                data={statusOptions}
                placeholder="Select status"
                {...form.getInputProps("status")}
                searchable
              />
            </div>
          </Form>
        </Flex>
        {!isCancelled ? (
          <Flex className="flex-grow" direction="column">
            <Form form={itemForm} onSubmit={handleSubmitItem} className="flex-1">
              <Title size="h4">
                Invoice item details
                {form?.values?.items.length > 0 && `(${form?.values?.items.length})`}
              </Title>
              <div className="grid grid-cols-3 gap-x-3 gap-y-2">
                {allowMultipleDr && (
                  <TextInput
                    label="Delivery receipt"
                    {...itemForm.getInputProps("dr_no")}
                  />
                )}
                <TextInput
                  withAsterisk
                  label="Purchase order no."
                  {...itemForm.getInputProps("purchase_order_no")}
                />
                <TextInput label="Particular" {...itemForm.getInputProps("particular")} />
                <TextInput label="Part number" {...itemForm.getInputProps("part_no")} />
                <NumberInput
                  withAsterisk
                  label="Quantity"
                  {...itemForm.getInputProps("quantity")}
                />
                <NumberInput
                  withAsterisk
                  label="Unit price"
                  precision={5}
                  {...itemForm.getInputProps("unit_price")}
                />
                <NumberInput
                  label="Amount"
                  precision={5}
                  value={calculateTotalAmount(
                    +itemForm.values.quantity,
                    +itemForm.values.unit_price,
                  )}
                  disabled
                />
                <TextInput label="Remarks" {...itemForm.getInputProps("remarks")} />
              </div>
              <div className="flex space-x-4 max-w-sm ml-auto">
                <Button
                  mt={25}
                  variant="outline"
                  color="gray"
                  fullWidth
                  onClick={() => itemForm.reset()}
                >
                  Reset
                </Button>
                <Button fullWidth mt={25} variant="outline" type="submit" color="teal">
                  Add item
                </Button>
              </div>
            </Form>
            <Flex direction="column" py={7} className="flex-grow" mih={250}>
              <Table
                data={itemTableData}
                format={itemTableFormat}
                emptyMessage={
                  form?.errors?.items ? (
                    <Text size="sm" color="red">
                      {form?.errors?.items}
                    </Text>
                  ) : undefined
                }
                showTotal={{
                  columnKeys: ["total"],
                }}
              />
            </Flex>
          </Flex>
        ) : (
          <NoData message="Cancelled invoiced" />
        )}
      </Flex>
      <ModalButtons
        okType="button"
        onOk={form.onSubmit(handleSubmit)}
        isLoading={isLoading}
        onCancel={onClose}
      />
    </Flex>
  );
}

export default InvoiceModal;
