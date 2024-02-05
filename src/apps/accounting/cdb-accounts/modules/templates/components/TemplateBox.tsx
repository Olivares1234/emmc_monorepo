import type { FC } from "react";
import { useDrag } from "react-dnd";
import { Paper } from "@mantine/core";

import { BoxProps, ItemTypes } from "./types";

export const TemplateBox: FC<BoxProps> = ({ id, left, top, children, fontFamily }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.Box,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  );

  if (isDragging) {
    return <div ref={drag} />;
  }
  return (
    <Paper
      withBorder
      p={6}
      ref={drag}
      style={{
        width: "max-content",
        left,
        top,
        position: "absolute",
      }}
      data-testid="box"
    >
      <span
        style={{
          fontFamily,
        }}
      >
        {children}
      </span>
    </Paper>
  );
};
