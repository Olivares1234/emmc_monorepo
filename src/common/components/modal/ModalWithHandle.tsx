import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { ModalType } from "./types";

function ModalWithHandle({ modalProps, title, label, buttonProps, render }: ModalType) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={title ?? ""} centered {...modalProps}>
        {render(close)}
      </Modal>
      <Button onClick={open} {...buttonProps}>
        {label}
      </Button>
    </>
  );
}

export default ModalWithHandle;
