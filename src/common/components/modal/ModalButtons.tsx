import React from "react";
import { Button } from "@mantine/core";

export interface ModalButtonsProps {
  cancelLabel?: string;
  onCancel?: () => void;
  okLabel?: string;
  onOk?: () => void;
  hideCancel?: boolean;
  isLoading?: boolean;
  okType?: "submit" | "button" | "reset" | undefined;
  disabledOk?: boolean;
  disabledCancel?: boolean;
}

ModalButtons.defaultProps = {
  cancelLabel: "Cancel",
  onCancel: () => {
    //
  },
  okLabel: "Submit",
  onOk: () => {
    //
  },
  okType: "submit",
  hideCancel: false,
  isLoading: false,
  disabledOk: false,
  disabledCancel: false,
};

function ModalButtons({
  cancelLabel,
  hideCancel,
  okLabel,
  onCancel,
  onOk,
  isLoading,
  okType,
  disabledOk,
  disabledCancel,
}: ModalButtonsProps) {
  return (
    <div className="flex items-center justify-end">
      {!hideCancel && (
        <Button
          disabled={disabledCancel}
          variant="outline"
          className="mr-2"
          color="teal"
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
      )}
      <Button
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        disabled={isLoading || disabledOk}
        color="teal"
        type={okType ?? "submit"}
        loading={isLoading}
        onClick={onOk}
      >
        {okLabel}
      </Button>
    </div>
  );
}

export default ModalButtons;
