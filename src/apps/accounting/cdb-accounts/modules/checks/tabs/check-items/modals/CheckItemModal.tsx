import { Flex } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { ModalButtons } from "common/components/modal";
import { FormModal } from "common/types";
import { preparePayloadForRequest } from "utils/helpers";

import { CheckForm } from "../../../components/types";
import { useCreateCheckItems } from "../hooks";

import CheckItemFormDetails from "./CheckItemFormDetails";
import { checkDetailItemSchema } from "./schema";

type CheckItemType = Pick<CheckForm, "items">;

function CheckItemModal({ onClose, data }: FormModal<number>) {
  const [submit, isLoading] = useCreateCheckItems(Number(data));
  const form = useForm<CheckItemType>({
    initialValues: {
      items: [],
    },
    validate: yupResolver(checkDetailItemSchema),
  });

  const handleSubmit = async (val: CheckItemType) => {
    try {
      const payload = preparePayloadForRequest(val);
      await submit(payload);
      onClose();
    } catch (error) {
      //
    }
  };

  return (
    <Flex direction="column">
      <CheckItemFormDetails form={form} />
      <ModalButtons
        okType="button"
        onOk={form.onSubmit(handleSubmit)}
        isLoading={isLoading}
        onCancel={onClose}
      />
    </Flex>
  );
}

export default CheckItemModal;
