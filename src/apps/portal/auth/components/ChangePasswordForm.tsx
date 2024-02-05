import { useCallback } from "react";
import { Flex, PasswordInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";
import * as yup from "yup";

import { useUpdatePassword } from "../hooks";

const schema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().required("New Password is required"),
  repeatNewPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .label("Confirm new password"),
});

function ChangePasswordForm({
  onClose,
  isFirstLoggedIn,
}: FormModal & {
  isFirstLoggedIn?: boolean;
}) {
  const [submit, isLoading] = useUpdatePassword();

  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    validate: yupResolver(schema),
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
      <Form form={form} onSubmit={handleSubmit} className="flex-1 mb-4 space-y-3">
        <PasswordInput
          withAsterisk
          label="Current password"
          {...form.getInputProps("currentPassword")}
        />
        <PasswordInput
          withAsterisk
          label="New password"
          {...form.getInputProps("newPassword")}
        />
        <PasswordInput
          withAsterisk
          label="Confirm new password"
          {...form.getInputProps("repeatNewPassword")}
        />
      </Form>
      <ModalButtons
        okType="button"
        onOk={form.onSubmit(handleSubmit)}
        isLoading={isLoading}
        onCancel={isFirstLoggedIn ? form.reset : onClose}
        cancelLabel={isFirstLoggedIn ? "Reset" : "Cancel"}
      />
    </Flex>
  );
}

export default ChangePasswordForm;
