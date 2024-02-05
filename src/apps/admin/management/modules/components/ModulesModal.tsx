import { TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";
import { removeEmpty } from "utils/helpers";
import * as yup from "yup";

import { useCreateModules } from "../hooks";
import { ModuleType } from "../types";

import { moduleDefaultValue } from "./constants";

const schema = yup.object().shape({
  module: yup.string().required().label("Module name").min(3),
});

function ModulesModal({ onClose }: FormModal<ModuleType>) {
  const [submit, isLoading] = useCreateModules();
  const form = useForm({
    initialValues: moduleDefaultValue,
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
            label="Module"
            placeholder="Awesome module"
            {...form.getInputProps("module")}
          />
          <ModalButtons isLoading={isLoading} onCancel={onClose} />
        </div>
      </Form>
    </div>
  );
}

export default ModulesModal;
