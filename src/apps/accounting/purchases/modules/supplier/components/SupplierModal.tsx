import { IMaskInput } from "react-imask";
import { Flex, Input, NumberInput, Select, TextInput } from "@mantine/core";
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

import { useCreateEditSupplier } from "../hooks";
import { Supplier } from "../type";

import { supplierDefaultData, TransacTypeOpt } from "./constants";

const schema = yup.object().shape({
  ...addressPickerSchema,
  name: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9_ -]+$/, "Invalid Supplier Name")
    .label("Supplier name"),
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

function SupplierModal({ onClose, data, isEditMode }: FormModal<Supplier>) {
  const [submit, isLoading] = useCreateEditSupplier(data?.id);
  const form = useForm({
    initialValues: isEditMode
      ? transformPayloadToAddressValue(data as AnyObject)
      : supplierDefaultData,
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
    <Flex direction="column">
      <Flex className="flex-grow" direction="column">
        <Form form={form} onSubmit={handleSubmit} className="flex-1 w-full">
          <Flex w="100%" columnGap={24}>
            {/* <div className="flex flex-col space-y-4"> */}
            <Flex direction="column" rowGap={6} w="100%">
              <TextInput
                withAsterisk
                label="Supplier Name"
                placeholder="Supplier 1 ex."
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

              <NumberInput
                label="Payment terms"
                {...form.getInputProps("payment_terms")}
              />

              <Select
                withAsterisk
                label="Preferred Transaction Type"
                data={TransacTypeOpt}
                className="mb-10"
                {...form.getInputProps("preferred_transaction_type")}
              />
            </Flex>
            <Flex direction="column" rowGap={6} w="100%">
              <AddressPicker form={form} />
            </Flex>
          </Flex>
          <ModalButtons isLoading={isLoading} onCancel={onClose} />
        </Form>
      </Flex>
    </Flex>
  );
}

export default SupplierModal;
