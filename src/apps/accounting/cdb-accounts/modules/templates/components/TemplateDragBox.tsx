import { useCallback, useMemo } from "react";
import { useDrop, XYCoord } from "react-dnd";
import { Paper } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { startCase } from "utils/helpers";

import { Template } from "../types";

import { TemplateBox } from "./TemplateBox";
import { ItemTypes } from "./types";

interface Props {
  form: UseFormReturnType<Template>;
}

function TemplateDragBox({ form }: Props) {
  const moveBox = useCallback(
    (fieldkey: string, x: number, y: number) => {
      const copySpecs = [...form.values.specs];
      const selectedSpecsIdx = copySpecs.findIndex((s) => s.fieldKeys === fieldkey);
      if (selectedSpecsIdx > -1) {
        const specs = copySpecs[selectedSpecsIdx];
        copySpecs[selectedSpecsIdx] = {
          ...specs,
          x,
          y,
        };
        form.setFieldValue("specs", copySpecs);
      }
    },
    [form.values.specs],
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.Box,

      drop(item: Record<string, number>, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(String(item.id), left, top);
      },
    }),
    [moveBox],
  );

  const width = useMemo(() => (form.values.width ?? 0) * 92 || 92, [form.values.width]);
  const height = useMemo(
    () => (form.values.height ?? 0) * 92 || 92,
    [form.values.height],
  );

  return (
    <Paper
      ref={drop}
      style={{
        height,
        position: "relative",
        overflow: "hidden",
        width,
        display: "block",
        fontSize: `${form.values.fontSize}px`,
      }}
      withBorder
    >
      {form?.values?.specs.map((spec) => {
        const { x, y, fieldKeys } = spec;
        return (
          <TemplateBox
            fontFamily={form.values.fontStyle}
            key={fieldKeys}
            id={fieldKeys}
            left={x}
            top={y}
          >
            {startCase(fieldKeys)}
          </TemplateBox>
        );
      })}
    </Paper>
  );
}

export default TemplateDragBox;
