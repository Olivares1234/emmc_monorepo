import { Textarea, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { convertNullEmpty, removeEmpty } from "utils/helpers";
import * as yup from "yup";

import { useCreateEditOrganizations } from "../hooks";
import { OrganizationModalType } from "../types";

import { defaultOrgValue } from "./constants";

const schema = yup.object().shape({
  name: yup.string().required().label("Name").min(3),
  description: yup.string().nullable().label("Description"),
});

function OrganizationsModal({ onClose, data, isEditMode }: OrganizationModalType) {
  const [submit, isLoading] = useCreateEditOrganizations(data?.id);
  const form = useForm({
    initialValues: isEditMode ? convertNullEmpty(data ?? {}) : defaultOrgValue,
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
            label="Organization name"
            placeholder="Awesome organization"
            {...form.getInputProps("name")}
          />
          <Textarea
            withAsterisk
            label="Description"
            placeholder="Best organization"
            {...form.getInputProps("description")}
          />
          <ModalButtons isLoading={isLoading} onCancel={onClose} />
        </div>
      </Form>
    </div>
  );
}

export default OrganizationsModal;
