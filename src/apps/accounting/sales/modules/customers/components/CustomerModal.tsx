import { IMaskInput } from "react-imask";
import { Group, Input, NumberInput, Radio, TextInput } from "@mantine/core";
import { Form, useForm, yupResolver } from "@mantine/form";
import AddressPicker, {
  addressPickerSchema,
  transformAddressDataToPayload,
  transformPayloadToAddressValue,
} from "common/components/form/AddressPicker";
import { ModalButtons } from "common/components/modal";
import { AnyObject, FormModal } from "common/types";
import { removeEmpty } from "utils/helpers";
import * as yup from "yup";

import { useCreateEditCustomer } from "../hooks";
import { Customers } from "../types";

import { customerDefaultData } from "./constants";

const schema = yup.object().shape({
  ...addressPickerSchema,
  name: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9_ -]+$/, "Invalid customer name")
    .label("Customer name"),
  tin_no: yup
    .string()
    .required()
    .matches(/^\d{3}-\d{3}-\d{3}-\d{3}$/, "Invalid TIN number")
    .label("Tin number"),
  payment_terms: yup
    .number()
    .nullable()
    .min(1)
    .max(500)
    .required()
    .label("Payment terms"),
});

function CustomerModal({ onClose, data, isEditMode }: FormModal<Customers>) {
  const [submit, isLoading] = useCreateEditCustomer(data?.id);
  const form = useForm({
    initialValues: isEditMode
      ? transformPayloadToAddressValue(data as AnyObject)
      : customerDefaultData,
    validate: yupResolver(schema),
  });
  const handleSubmit = async (val: typeof form.values) => {
    try {
      await submit(removeEmpty(transformAddressDataToPayload(val)));
      onClose();
    } catch (e) {
      //
    }
  };

  return (
    <div>
      <Form form={form} onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="flex-1 space-y-3">
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Awesome Client"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Address line 1"
              placeholder="Bldg/Street/No."
              {...form.getInputProps("line_1")}
            />
            <Input.Wrapper withAsterisk label="TIN No.">
              <Input<any>
                component={IMaskInput}
                mask="000-000-000-000"
                placeholder="XXX-XXX-XXX-XXX"
                {...form.getInputProps("tin_no")}
              />
            </Input.Wrapper>
            <NumberInput label="Payment terms" {...form.getInputProps("payment_terms")} />
            <Radio.Group
              label="Payment Schedule"
              description="Schedule of customers collection"
              withAsterisk
              {...form.getInputProps("payment_schedule")}
            >
              <Group mt="xs">
                <Radio value="weekly" label="Weekly" />
                <Radio value="bi_monthly" label="Bi-Monthly" />
                <Radio value="end_month" label="End of month" />
              </Group>
            </Radio.Group>
          </div>
          <div className="flex-1 space-y-3">
            <AddressPicker form={form} />
            <Radio.Group
              label="Multiple DR"
              description="Different delivery receipt no. for items on invoice creation"
              withAsterisk
              {...form.getInputProps("allow_multiple_dr")}
              onChange={(val) => form.setFieldValue("allow_multiple_dr", val === "true")}
            >
              <Group mt="xs">
                <Radio value={true as unknown as string} label="Allow" />
                <Radio value={false as unknown as string} label="Don't Allow" />
              </Group>
            </Radio.Group>
          </div>
        </div>
        <ModalButtons isLoading={isLoading} onCancel={onClose} />
      </Form>
    </div>
  );
}

export default CustomerModal;
