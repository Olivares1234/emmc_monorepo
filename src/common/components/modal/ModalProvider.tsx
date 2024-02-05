import React, { createContext, useContext, useRef } from "react";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { ModalProviderType, OpenModalType } from "./types";

const ModalContext = createContext({
  openModal: (key: OpenModalType) => {
    //
  },
});

export const useModalContext = (): ((key: OpenModalType) => void) => {
  const { openModal } = useContext(ModalContext);
  return openModal;
};

export const ModalProvider = ({ children }: ModalProviderType) => {
  const [opened, { open, close }] = useDisclosure();
  const modalRef = useRef<OpenModalType>();

  const openModal = (props: OpenModalType) => {
    modalRef.current = props;
    open();
  };

  const onClose = () => {
    modalRef.current = undefined;
    close();
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
      }}
    >
      {children}
      <Modal
        opened={opened}
        onClose={onClose}
        title={modalRef?.current?.title ?? ""}
        size={modalRef?.current?.size ?? "md"}
        centered
        {...(modalRef?.current?.modalProps ?? {})}
      >
        <Modal.Body
          className="box-border overflow-y-auto"
          style={{
            maxHeight: `calc(100vh - (9vh * 2))`,
          }}
        >
          {modalRef?.current?.render && modalRef?.current?.render(onClose)}
        </Modal.Body>
      </Modal>
    </ModalContext.Provider>
  );
};
