import { ReactNode } from "react";
import { clsx } from "@mantine/core";

function Container({
  children,
  compactTopMargin,
}: {
  children: ReactNode | JSX.Element;
  compactTopMargin?: boolean;
}) {
  return (
    <div
      className={clsx(
        "container mx-auto flex flex-col flex-grow pb-12 px-6 xxl:px-0",
        compactTopMargin ? "mt-4" : "mt-12",
      )}
    >
      {children}
    </div>
  );
}

export default Container;
