import { Flex, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Form, useForm, UseFormReturnType, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";
import { preparePayloadForRequest } from "utils/helpers";

import { useCreateEditChecks } from "../hooks";
import CheckItemFormDetails from "../tabs/check-items/modals/CheckItemFormDetails";
import { Check } from "../types";

import { checksDefaultData } from "./constants";
import { checkDetailSchema } from "./schema";
import { CheckForm } from "./types";

function ChecksModal({ onClose, data }: FormModal<Check>) {
  const [submit, isLoading] = useCreateEditChecks(data?.id);
  const form = useForm<CheckForm>({
    initialValues: checksDefaultData,
    validate: yupResolver(checkDetailSchema),
  });

  const handleSubmit = async (val: CheckForm) => {
    try {
      const payload = preparePayloadForRequest(val);
      await submit(payload);
      onClose();
    } catch (error) {
      //
    }
  };

  return (
    <Flex direction="column">
      <Flex columnGap={20}>
        <Flex w="30%">
          <Form className="w-full" form={form}>
            <Text className="font-bold text-gray-800 uppercase">
              Check/Voucher details
            </Text>
            <div className="flex flex-col space-y-1">
              <DateInput
                withAsterisk
                label="Date prepared"
                placeholder="MM-DD-YYYY"
                valueFormat="MM-DD-YYYY"
                clearable
                maxDate={new Date()}
                {...form.getInputProps("datePrepared")}
              />
              <DateInput
                withAsterisk
                label="Voucher date"
                placeholder="MM-DD-YYYY"
                valueFormat="MM-DD-YYYY"
                clearable
                maxDate={new Date()}
                {...form.getInputProps("voucherDate")}
              />
              <TextInput
                withAsterisk
                label="Voucher Number"
                placeholder="XX-XXXXXX"
                {...form.getInputProps("voucherNumber")}
              />
              <DateInput
                withAsterisk
                label="Check date"
                placeholder="MM-DD-YYYY"
                valueFormat="MM-DD-YYYY"
                clearable
                maxDate={new Date()}
                {...form.getInputProps("checkDate")}
              />
              <TextInput
                withAsterisk
                label="Check Number"
                placeholder="XX-XXXXXX"
                {...form.getInputProps("checkNumber")}
              />
              <TextInput
                withAsterisk
                label="Payees Name"
                placeholder="Payees Name"
                {...form.getInputProps("payeesName")}
              />
            </div>
          </Form>
        </Flex>
        <CheckItemFormDetails
          form={form as unknown as UseFormReturnType<Pick<CheckForm, "items">>}
        />
      </Flex>
      {/* <Debug data={form} /> */}
      <ModalButtons
        okType="button"
        onOk={form.onSubmit(handleSubmit)}
        isLoading={isLoading}
        onCancel={onClose}
      />
    </Flex>
  );
}

export default ChecksModal;
