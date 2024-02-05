import { Button } from "@mantine/core";

import { ConfirmationModalType } from "./types";
import { createModal } from "./utils";

export const confirmationDialog = ({
  message,
  onOk,
  onCancel,
}: ConfirmationModalType) => {
  createModal({
    title: "Confirmation",
    size: "sm",
    render: (close) => (
      <div className="flex flex-col items-center justify-center">
        <p className="font-medium text-center text-lg">{message}</p>
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            className="mr-2"
            color="teal"
            onClick={() => {
              onCancel?.();
              close();
            }}
            size="xs"
          >
            Cancel
          </Button>
          <Button
            color="teal"
            onClick={() => {
              onOk?.();
              close();
            }}
            size="xs"
          >
            Confirm
          </Button>
        </div>
      </div>
    ),
  });
};
