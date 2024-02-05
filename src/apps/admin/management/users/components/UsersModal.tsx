import { MultiSelect, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { UserProfile } from "apps/portal/auth/types";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";
import { removeEmpty } from "utils/helpers";
import * as yup from "yup";

import { useGetModuleOptions } from "../../modules/hooks";
import { useGetOrganizationOptions } from "../../organizations/hooks";
import { useGetRolesOptions } from "../../roles/hooks";
import { useCreateEditUsers } from "../hooks";

import { usersDefaultValue } from "./constants";

const schema = yup.object().shape({
  first_name: yup.string().required().label("First name"),
  last_name: yup.string().required().label("First name"),
  email: yup.string().email().required().label("First name"),
  role_id: yup.string().required().label("Role"),
  organization_id: yup.string().required().label("Organization"),
  modules: yup.array(yup.number()).min(1).required().label("Role"),
});

function UsersModal({ onClose, data, isEditMode }: FormModal<UserProfile>) {
  const [roleOpt] = useGetRolesOptions();
  const [orgOpt] = useGetOrganizationOptions();
  const [moduleOpt] = useGetModuleOptions();

  const [submit, isLoading] = useCreateEditUsers(data?.id);
  const form = useForm({
    initialValues: isEditMode
      ? {
          ...data,
          organization_id: data?.organization?.id,
          role_id: data?.role?.id,
          modules: data?.users_modules?.map((m) => m.module_id) ?? [],
        }
      : usersDefaultValue,
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
          {!isEditMode && (
            <Select
              withAsterisk
              label="Organization"
              placeholder="Select"
              data={orgOpt}
              {...form.getInputProps("organization_id")}
            />
          )}
          <TextInput
            withAsterisk
            label="First name"
            placeholder="Juan"
            {...form.getInputProps("first_name")}
          />
          <TextInput
            withAsterisk
            label="Last name"
            placeholder="Dela cruz"
            {...form.getInputProps("last_name")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="juandelacruz@email.com"
            disabled={isEditMode}
            {...(isEditMode ? {} : form.getInputProps("email"))}
          />
          <Select
            withAsterisk
            label="Role"
            placeholder="Select"
            data={roleOpt}
            disabled={isEditMode}
            {...form.getInputProps("role_id")}
          />
          <TextInput
            label="Position"
            placeholder="Awesome position"
            {...form.getInputProps("position")}
          />
          <MultiSelect
            label="Modules"
            placeholder="Assign modules"
            data={moduleOpt}
            {...form.getInputProps("modules")}
          />
          <ModalButtons isLoading={isLoading} onCancel={onClose} />
        </div>
      </Form>
    </div>
  );
}

export default UsersModal;
