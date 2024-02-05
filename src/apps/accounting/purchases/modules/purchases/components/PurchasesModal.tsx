import { useCallback, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import { Button, Flex, NumberInput, Select, Text, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Form, useForm, yupResolver } from "@mantine/form";
// import { useGetModuleOptions } from "apps/admin/modules/hooks";
// import { useGetOrganizationOptions } from "apps/admin/organizations/hooks";
import { ModalButtons } from "common/components/modal";
import { Table } from "common/components/table";
import { TableFormatType } from "common/components/table/types";
import { AnyObject, FormModal } from "common/types";
import { calculateTotalAmount, convertDateToLocale, removeEmpty } from "utils/helpers";

import { useGetAccountsOptions } from "../../accounts/hooks";
import { useGetSuplierOptions } from "../../supplier/hooks";
import { useCreateEditPurchases } from "../hooks";
import { PurchaseDefaultvalue } from "../types";

import {
  classificationOptions,
  currencyOpt,
  purchaseDefaultValue,
  purchaseItemDefaultValue,
  salesTypeOpt,
} from "./constants";
import { itemSchema, schema } from "./schema";

function PurchasesModal({ onClose }: FormModal<AnyObject>) {
  const [supplierOpt, loadingSupplier] = useGetSuplierOptions();
  const [accountsOpt, loadingAccountsCode] = useGetAccountsOptions(true);
  const [submit, isLoading] = useCreateEditPurchases();

  const form = useForm<PurchaseDefaultvalue>({
    initialValues: purchaseDefaultValue,
    validate: yupResolver(schema),
  });

  const itemForm = useForm({
    initialValues: purchaseItemDefaultValue,
    validate: yupResolver(itemSchema),
  });

  const handleSubmit = useCallback(async (value: PurchaseDefaultvalue) => {
    try {
      // insert DR to items
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const [account_id] = value.accounts_id.split(":::");

      const newValue = {
        ...value,
        account_id: +account_id,
        invoice_date: convertDateToLocale(value?.invoice_date as unknown as Date),
        items: value.items.map((val) => ({
          ...val,
          dr_no: value.dr_no,
          importation_amount: +val.importation_amount,
        })),
      };

      await submit(removeEmpty(newValue));
      onClose();
    } catch (e) {
      //
    }
  }, []);

  const handleSubmitItem = useCallback(
    (value: typeof purchaseItemDefaultValue) => {
      form.setFieldValue(
        "items",
        form.values.items.concat([
          {
            ...value,
            purchase_order_no:
              value.purchase_order_no.trim() !== "" ? value.purchase_order_no : "N/A",
            purchase_request_no:
              value.purchase_request_no.trim() !== "" ? value.purchase_request_no : "N/A",
            part_no: value.part_no.trim() !== "" ? value.part_no : "N/A",
            particular: value.particular.trim() !== "" ? value.particular : "N/A",
            total: calculateTotalAmount(+value.quantity, +value.unit_price),
          },
        ]),
      );
      itemForm.reset();
    },
    [form],
  );

  const itemTableFormat = useMemo<TableFormatType[]>(
    () => [
      {
        label: "PR Number",
        colKey: "purchase_request_no",
      },
      {
        label: "PO Number",
        colKey: "purchase_order_no",
      },
      {
        label: "Particular",
        colKey: "particular",
      },
      {
        label: "Part Number",
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
        label: "Total",
        colKey: "total",
      },
      {
        label: "Import Amt",
        colKey: "importation_amount",
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

  const accountTitle = useMemo<string>(() => {
    try {
      const [, accountTitle] = form.values.accounts_id.split(":::");
      return accountTitle;
    } catch (_e) {
      return "";
    }
  }, [form.values.accounts_id]);

  return (
    <Flex direction="column">
      <Flex columnGap={20}>
        <Flex w="30%">
          <Form className="w-full" form={form}>
            <Title size="h4">Purchase order details</Title>
            <div className="flex flex-col space-y-1">
              <Select
                withAsterisk
                label="Supplier"
                placeholder={loadingSupplier ? "Loading suppliers..." : "Select supplier"}
                data={supplierOpt}
                {...form.getInputProps("supplier_id")}
              />
              <Select
                withAsterisk
                label="Accounts Code"
                placeholder={
                  loadingAccountsCode
                    ? "Loading accounts code..."
                    : "Select accounts code"
                }
                data={accountsOpt}
                {...form.getInputProps("accounts_id")}
              />
              <TextInput label="Account Title" value={accountTitle} disabled />
              <DateInput
                withAsterisk
                label="Invoice Date"
                placeholder="MM-DD-YYYY"
                valueFormat="MM-DD-YYYY"
                clearable
                maxDate={new Date()}
                {...form.getInputProps("invoice_date")}
              />
              <TextInput
                withAsterisk
                placeholder="XX-XXXXXX"
                label="Invoice No"
                {...form.getInputProps("invoice_no")}
              />
              <Select
                withAsterisk
                data={currencyOpt}
                label="Currency"
                {...form.getInputProps("currency")}
              />
              <TextInput
                placeholder="XX-XXXXXX"
                label="Delivery receipt"
                {...form.getInputProps("dr_no")}
              />
              <Select
                withAsterisk
                label="Purchase Type"
                placeholder="Select"
                data={salesTypeOpt}
                {...form.getInputProps("sales_type")}
              />
              <Select
                withAsterisk
                label="Classification"
                placeholder="Select"
                data={classificationOptions}
                {...form.getInputProps("classification")}
              />
            </div>
          </Form>
        </Flex>
        <Flex className="flex-grow" direction="column">
          <Form form={itemForm} onSubmit={handleSubmitItem} className="flex-1">
            <Title size="h4">
              Purchase Order item details
              {form?.values?.items.length > 0 && `(${form?.values?.items.length})`}
            </Title>
            <div className="grid grid-cols-3 gap-x-3 gap-y-2">
              <TextInput
                label="Purchase request no."
                placeholder="XX-XXXXXX"
                {...itemForm.getInputProps("purchase_request_no")}
              />
              <TextInput
                label="Purchase order no."
                placeholder="XX-XXXXXX"
                {...itemForm.getInputProps("purchase_order_no")}
              />
              <TextInput label="Particular" {...itemForm.getInputProps("particular")} />
              <TextInput
                label="Part number"
                placeholder="XX-XXXXXX"
                {...itemForm.getInputProps("part_no")}
              />
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
                label="Importation amount"
                precision={5}
                {...itemForm.getInputProps("importation_amount")}
              />
              <TextInput label="Remarks" {...form.getInputProps("remarks")} />
              <NumberInput
                label="Amount"
                precision={5}
                value={calculateTotalAmount(
                  +itemForm.values.quantity,
                  +itemForm.values.unit_price,
                )}
                disabled
              />
              <Button
                mt={25}
                variant="outline"
                color="gray"
                onClick={() => itemForm.reset()}
              >
                Reset
              </Button>
              <Button mt={25} variant="outline" type="submit" color="teal">
                Add item
              </Button>
            </div>
          </Form>
          <Flex direction="column" py={7} className="flex-grow" mih={250}>
            <Table
              data={form?.values?.items}
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

export default PurchasesModal;
