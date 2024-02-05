import { clsx } from "@mantine/core";
import { AnyObject } from "common/types";
import { useGetColorScheme } from "hooks/useGetColorScheme";
import { startCase } from "utils/helpers";

import { statusColors } from "./constants";

function InvoiceStatus({ status }: { status: string }) {
  const scheme = useGetColorScheme();

  return (
    <div
      className={clsx(
        "text-xs font-medium text-white py-1 px-2 rounded-md text-center max-w-max",
        (statusColors as AnyObject)?.[status ?? "Default"]?.[scheme],
      )}
    >
      {startCase(status)}
    </div>
  );
}

export default InvoiceStatus;
