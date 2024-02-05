import { TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";

import { useCreateEditAccounts } from "../hooks";
import { Accounts } from "../type";

import { accountsDefaultData, accountsSchema } from "./constants";

function AccountsModal({ onClose, data, isEditMode }: FormModal<Accounts>) {
  const [submit, isLoading] = useCreateEditAccounts(data?.id);
  const form = useForm({
    initialValues: isEditMode ? data : accountsDefaultData,
    validate: yupResolver(accountsSchema),
  });
  const handleSubmit = async (val: typeof form.values) => {
    try {
      await submit(val);
      onClose();
    } catch (e) {
      //
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="w-full" form={form}>
      <div className="flex flex-col space-y-3">
        <TextInput
          withAsterisk
          label="Accounts Code"
          placeholder="Awesome Code"
          {...form.getInputProps("code")}
        />
        <TextInput
          withAsterisk
          label="Accounts Title"
          placeholder="Awesome Title"
          {...form.getInputProps("title")}
        />
        <ModalButtons
          onOk={form.onSubmit(handleSubmit)}
          isLoading={isLoading}
          onCancel={onClose}
        />
      </div>
    </Form>
  );
}

export default AccountsModal;
