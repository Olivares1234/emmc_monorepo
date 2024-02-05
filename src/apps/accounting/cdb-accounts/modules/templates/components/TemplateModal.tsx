import { useCallback, useMemo } from "react";
import { Chip, Flex, NumberInput, Select, Text, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";
import { camelCaseKeysToSnakeCase } from "utils/helpers";

import { useCreateEditTemplate } from "../hooks";
import { Template, TemplateFieldkeys } from "../types";

import {
  fieldOptions,
  fontSizes,
  fontStyles,
  templatesDefaultData,
  templatesSchema,
} from "./constants";
import TemplateDragBox from "./TemplateDragBox";

function TemplateModal({ onClose, data, isEditMode }: FormModal<Template>) {
  const [submit, isLoading] = useCreateEditTemplate(data?.id);
  const form = useForm<Template>({
    initialValues: isEditMode
      ? ({
          ...data,
          fontSize: String(data?.fontSize),
        } as Template)
      : templatesDefaultData,
    validate: yupResolver(templatesSchema),
  });

  const checkedSpecs = useMemo(
    () => form.values.specs.map((s) => s.fieldKeys),
    [form.values],
  );

  const handleSubmit = async (val: Template) => {
    try {
      const convertedValue = camelCaseKeysToSnakeCase(val);
      await submit({
        ...convertedValue,
        font_size: +convertedValue.font_size,
      });
      onClose();
    } catch (e) {}
  };

  const handleSelectKeys = useCallback(
    (fieldKey: string) => (checked: boolean) => {
      if (!checked) {
        form.setFieldValue(
          "specs",
          form.values.specs.filter((f) => f.fieldKeys !== fieldKey),
        );

        return;
      }

      form.setFieldValue("specs", [
        ...form.values.specs,
        {
          fieldKeys: fieldKey as TemplateFieldkeys,
          x: 0,
          y: 0,
        },
      ]);
    },
    [form.values.specs],
  );

  return (
    <Form onSubmit={handleSubmit} className="w-full" form={form}>
      <div className="flex flex-col space-y-3">
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Awesome Template"
          {...form.getInputProps("name")}
        />
        <Flex columnGap={5} wrap="wrap" rowGap={5}>
          {fieldOptions.map((f) => (
            <Chip
              key={f.value}
              checked={checkedSpecs.includes(f.value as TemplateFieldkeys)}
              value={f.value}
              onChange={handleSelectKeys(f.value)}
            >
              {f.label}
            </Chip>
          ))}
        </Flex>
        <Flex columnGap={12} w="100%">
          <Flex className="flex-1" columnGap={12}>
            <Select
              className="flex-1"
              data={fontSizes}
              withAsterisk
              label="Font Size"
              {...form.getInputProps("fontSize")}
            />
            <Select
              className="flex-1"
              withAsterisk
              data={fontStyles}
              label="Font Style"
              placeholder="Awesome Font style"
              {...form.getInputProps("fontStyle")}
            />
          </Flex>
          <Flex className="flex-1" columnGap={12}>
            <NumberInput
              className="flex-1"
              withAsterisk
              label="Width"
              max={8}
              min={1}
              {...form.getInputProps("width")}
            />
            <NumberInput
              className="flex-1"
              withAsterisk
              label="Height"
              max={8}
              min={1}
              {...form.getInputProps("height")}
            />
          </Flex>
        </Flex>
        <Text>Drag the label to change position</Text>
        {form?.errors?.specs ? (
          <Text size="sm" color="red">
            {form?.errors?.specs}
          </Text>
        ) : undefined}
        <div className="flex justify-center items-center w-auto">
          <TemplateDragBox form={form} />
        </div>
        <ModalButtons
          onOk={form.onSubmit(handleSubmit)}
          isLoading={isLoading}
          onCancel={onClose}
        />
      </div>
    </Form>
  );
}

export default TemplateModal;
