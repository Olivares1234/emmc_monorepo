import { TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";
import { removeEmpty } from "utils/helpers";
import * as yup from "yup";

import { useCreateRole } from "../hooks";
import { RoleType } from "../types";

import { roleDefaultValue } from "./constants";

const schema = yup.object().shape({
  role: yup.string().required().label("Role name").min(3),
});

function RolesModal({ onClose }: FormModal<RoleType>) {
  const [submit, isLoading] = useCreateRole();
  const form = useForm({
    initialValues: roleDefaultValue,
    validate: yupResolver(schema),
  });

  const handleSubmit = async (val: typeof form.values) => {
    try {
      await submit(removeEmpty(val));
      onClose();
    } catch (e) {
      //
    }
  };

  return (
    <div>
      <Form form={form} onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <TextInput
            withAsterisk
            label="Role"
            placeholder="Perfect role"
            {...form.getInputProps("role")}
          />
          <ModalButtons isLoading={isLoading} onCancel={onClose} />
        </div>
      </Form>
    </div>
  );
}

export default RolesModal;
