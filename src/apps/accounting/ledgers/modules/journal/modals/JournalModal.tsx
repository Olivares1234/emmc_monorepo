import { useCallback, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import { Button, Flex, NumberInput, Select, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Form, useForm, yupResolver } from "@mantine/form";
import { useGetAccountsOptions } from "apps/accounting/purchases/modules/accounts/hooks";
import { ModalButtons } from "common/components/modal";
import { Table } from "common/components/table";
import { TableFormatType } from "common/components/table/types";
import { AccountingEntry, AnyObject, FormModal } from "common/types";
import { preparePayloadForRequest } from "utils/helpers";

import { useCreateEditJournal } from "../hooks";

import { journalItemModalDefault, journalModalDefault } from "./constants";
import { journalItemSchema, journalSchema } from "./schema";
import { JournalForm, JournalFormItem } from "./types";

function JournalModals({ onClose }: FormModal) {
  const [accountOptions] = useGetAccountsOptions();
  const [submit, isLoading] = useCreateEditJournal();
  const form = useForm<JournalForm>({
    initialValues: journalModalDefault,
    validate: yupResolver(journalSchema),
  });

  const itemForm = useForm<JournalFormItem>({
    initialValues: journalItemModalDefault,
    validate: yupResolver(journalItemSchema),
  });

  const handleSubmitItem = useCallback(
    (val: JournalFormItem) => {
      form.setFieldValue("items", form.values.items.concat([val]));
      itemForm.setValues(journalItemModalDefault);
    },
    [form.values.items],
  );

  const handleSubmit = async (val: JournalForm) => {
    try {
      const payload = preparePayloadForRequest({
        items: val.items?.map((i) => {
          const item = i as AnyObject;
          item.date = val.date;
          return item;
        }),
      });
      await submit(payload);
      onClose();
    } catch (error) {
      //
    }
  };

  const itemTableData = useMemo<JournalForm["items"]>(() => {
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

  const itemTableFormat = useMemo<Array<TableFormatType<JournalFormItem>>>(
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
        label: "Particular",
        colKey: "particular",
      },
      {
        label: "Debit",
        colKey: "debit",
        customRender: (val) => {
          if (val.type !== AccountingEntry.Debit) return 0?.toFixed(4);
          return val.amount?.toFixed(4);
        },
        className: `text-white ${isCreditAndDebitEqual ? "bg-green-500" : "bg-red-500"}`,
      },
      {
        label: "Credit",
        colKey: "credit",
        customRender: (val) => {
          if (val.type !== AccountingEntry.Credit) return 0?.toFixed(4);
          return val.amount?.toFixed(4);
        },
        className: `text-white ${isCreditAndDebitEqual ? "bg-green-500" : "bg-red-500"}`,
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
        element: totalDebit?.toFixed(4),
      },
      {
        index: 4,
        element: totalCredit?.toFixed(4),
      },
    ],
    [totalDebit, totalCredit],
  );

  const totalDiff = useMemo(
    () => Math.abs(totalCredit - totalDebit),
    [totalCredit, totalDebit],
  );

  return (
    <Flex className="flex-grow" direction="column">
      <Form form={itemForm} onSubmit={handleSubmitItem} className="flex-1">
        <Text className="font-bold text-gray-800 uppercase">
          Item details
          {form?.values?.items.length > 0 && `(${form?.values?.items.length})`}
        </Text>
        <div className="grid grid-cols-3 gap-x-3 gap-y-2">
          <DateInput
            withAsterisk
            label="Date"
            placeholder="Date"
            {...form.getInputProps("date")}
            maxDate={new Date()}
          />
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
          <TextInput label="Particular" {...itemForm.getInputProps("particular")} />
          <NumberInput
            withAsterisk
            label="Amount"
            precision={5}
            {...itemForm.getInputProps("amount")}
          />
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
              : `Debit and credit are not equal (${totalDiff} difference)`}
          </Text>
        )}
        <Table<JournalFormItem>
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
      <ModalButtons
        onCancel={onClose}
        onOk={form.onSubmit(handleSubmit)}
        okLabel="Create Entry"
        disabledOk={!isCreditAndDebitEqual}
        isLoading={isLoading}
      />
    </Flex>
  );
}

export default JournalModals;
