import { useCallback, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import { Button, Flex, NumberInput, Select, Text, TextInput } from "@mantine/core";
import { Form, useForm, UseFormReturnType, yupResolver } from "@mantine/form";
import { useGetAccountsOptions } from "apps/accounting/purchases/modules/accounts/hooks";
import { Table } from "common/components/table";
import { TableFormatType } from "common/components/table/types";
import { AccountingEntry, AnyObject } from "common/types";

import { checkItemDefaultData, departmentOpt } from "../../../components/constants";
import { CheckForm, CheckItemForm } from "../../../components/types";

import { checkItemSchema } from "./schema";

interface Props {
  form: UseFormReturnType<Pick<CheckForm, "items">>;
}

function CheckItemFormDetails({ form }: Props) {
  const [accountOptions] = useGetAccountsOptions();

  const itemForm = useForm<CheckItemForm>({
    initialValues: checkItemDefaultData,
    validate: yupResolver(checkItemSchema),
  });

  const handleSubmitItem = useCallback(
    (val: CheckItemForm) => {
      const updatedVal = {
        ...val,
        subTotal: val.amount,
        total: val.amount,
      };

      form.setFieldValue("items", form.values.items.concat([updatedVal]));
      itemForm.setValues(checkItemDefaultData);
    },
    [form.values.items],
  );

  const itemTableData = useMemo<CheckForm["items"]>(() => {
    if (form.values.items?.length < 1) return [];
    return form.values.items;
  }, [form.values.items]);

  const totalDebit = useMemo(
    () =>
      form.values.items.reduce((prev, curr) => {
        if (curr.type !== AccountingEntry.Debit) return prev;
        return prev + curr.amount;
      }, 0),
    [form.values.items],
  );

  const totalCredit = useMemo(
    () =>
      form.values.items.reduce((prev, curr) => {
        if (curr.type !== AccountingEntry.Credit) return prev;
        return prev + curr.amount;
      }, 0),
    [form.values.items],
  );

  const isCreditAndDebitEqual = useMemo(
    () => totalDebit === totalCredit,
    [totalDebit, totalCredit],
  );

  const itemTableFormat = useMemo<Array<TableFormatType<CheckItemForm>>>(
    () => [
      {
        label: "Entry",
        colKey: "type",
      },
      {
        label: "Account",
        colKey: "accountId",
      },
      {
        label: "Department",
        colKey: "department",
      },
      {
        label: "Debit",
        colKey: "debit",
        customRender: (val) => {
          if (val.type !== AccountingEntry.Debit) return 0;
          return val.amount;
        },
        className: `text-white ${isCreditAndDebitEqual ? "bg-green-500" : "bg-red-500"}`,
      },
      {
        label: "Credit",
        colKey: "credit",
        customRender: (val) => {
          if (val.type !== AccountingEntry.Credit) return 0;
          return val.amount;
        },
        className: `text-white ${isCreditAndDebitEqual ? "bg-green-500" : "bg-red-500"}`,
      },
      {
        label: "Remarks",
        colKey: "explanation",
        width: 200,
        maxWidth: 200,
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
    [form.values, isCreditAndDebitEqual],
  );

  const tableFooter = useMemo(
    () => [
      {
        index: 3,
        element: totalDebit,
      },
      {
        index: 4,
        element: totalCredit,
      },
    ],
    [totalDebit, totalCredit],
  );

  return (
    <Flex className="flex-grow" direction="column">
      <Form form={itemForm} onSubmit={handleSubmitItem} className="flex-1">
        <Text className="font-bold text-gray-800 uppercase">
          Item details
          {form?.values?.items.length > 0 && `(${form?.values?.items.length})`}
        </Text>
        <div className="grid grid-cols-3 gap-x-3 gap-y-2">
          <Select
            withAsterisk
            data={Object.values(AccountingEntry)}
            label="Entry"
            placeholder="Entry"
            {...itemForm.getInputProps("type")}
          />
          <Select
            withAsterisk
            data={accountOptions}
            label="Account"
            placeholder="Account"
            {...itemForm.getInputProps("accountId")}
          />
          <Select
            withAsterisk
            label="Department"
            placeholder="Select Department"
            data={departmentOpt}
            {...itemForm.getInputProps("department")}
          />
          <NumberInput
            withAsterisk
            label="Amount"
            precision={5}
            {...itemForm.getInputProps("amount")}
          />
          <TextInput label="Remarks" {...itemForm.getInputProps("explanation")} />
          <div className="flex space-x-4">
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
        </div>
      </Form>
      <Flex direction="column" py={7} className="flex-grow" mt={16} mih={300}>
        {form.values.items?.length > 0 && (
          <Text weight="700" color={isCreditAndDebitEqual ? "green" : "red"}>
            {isCreditAndDebitEqual
              ? "Debit and credit are equal"
              : "Debit and credit are not equal"}
          </Text>
        )}
        <Table<CheckItemForm>
          data={itemTableData}
          format={itemTableFormat}
          emptyMessage={
            form?.errors?.items ? (
              <Text size="sm" color="red">
                {form?.errors?.items}
              </Text>
            ) : undefined
          }
          footer={tableFooter}
        />
      </Flex>
    </Flex>
  );
}

export default CheckItemFormDetails;
