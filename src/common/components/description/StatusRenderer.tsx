import { clsx } from "@mantine/core";
import { AnyObject } from "common/types";
import { useGetColorScheme } from "hooks/useGetColorScheme";
import { startCase } from "utils/helpers";

import { StatusProps } from "./types";

function StatusRenderer({ status, colors }: StatusProps) {
  const scheme = useGetColorScheme();
  return (
    <div
      className={clsx(
        "text-xs font-medium text-white py-1 px-2 rounded-md text-center max-w-max",
        (colors as AnyObject)?.[status ?? "Default"]?.[scheme],
      )}
    >
      {startCase(status)}
    </div>
  );
}

export default StatusRenderer;
