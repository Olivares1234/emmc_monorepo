import { createRoot } from "react-dom/client";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Notification } from "@mantine/core";

export const ToastMarker = () => <div id="toast-marker" />;

export interface OpenToastType {
  type: "success" | "error";
  message: string;
  title?: string;
}

export const openToast = ({ type, message, title }: OpenToastType) => {
  const el = document.querySelector("#toast-marker");
  let timer: NodeJS.Timeout;
  if (el) {
    const root = createRoot(el);
    const colors = {
      success: "green",
      error: "red",
      default: "blue",
    };

    const Icon = {
      success: <FaCheck />,
      error: <FaTimes />,
      default: <FaCheck />,
    };

    root.render(
      <Notification
        title={title}
        color={colors?.[type] ?? colors.default}
        style={{
          zIndex: 9999,
          position: "fixed",
          top: 10,
          right: 20,
        }}
        w={300}
        icon={Icon?.[type] ?? Icon.default}
        onClose={() => root.unmount()}
      >
        {message}
      </Notification>,
    );

    timer = setTimeout(() => {
      root.unmount();
      clearTimeout(timer);
    }, 3000);
  }
};
