import { useCallback } from "react";
import { Flex, Select, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { useOperationGetCustomerOptions } from "apps/operations/hooks";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";

import { useCreateEditProjects } from "../hooks";
import { Project } from "../types";

// import { useCreateEditInvoice } from "../hooks";
import { projectDefaultValue } from "./constants";
import { projectSchema } from "./schemas";
import { ProjectValues } from "./types";

function ProjectModal({ onClose, isEditMode, data }: FormModal<Project>) {
  console.log(data, "dasda");
  const [submit, isLoading] = useCreateEditProjects(data?.id);
  const [customerOptions] = useOperationGetCustomerOptions();

  const form = useForm<ProjectValues>({
    initialValues: isEditMode ? (data as unknown as ProjectValues) : projectDefaultValue,
    validate: yupResolver(projectSchema),
  });

  const handleSubmit = useCallback(async (value: typeof form.values) => {
    try {
      await submit({
        name: value.name,
        customer_id: +value.customerId,
      });
      onClose();
    } catch (e) {
      //
    }
  }, []);

  return (
    <Flex direction="column">
      <Form className="w-full" form={form}>
        <div className="flex flex-col space-y-4">
          <Select
            withAsterisk
            label="Customer"
            data={customerOptions}
            placeholder={"Select customer"}
            {...form.getInputProps("customerId")}
            searchable
          />
          <TextInput
            withAsterisk
            label="Project name"
            placeholder="Awesome Project"
            {...form.getInputProps("name")}
          />
          <ModalButtons
            okType="button"
            onOk={form.onSubmit(handleSubmit)}
            isLoading={isLoading}
            onCancel={onClose}
          />
        </div>
      </Form>
    </Flex>
  );
}

export default ProjectModal;
