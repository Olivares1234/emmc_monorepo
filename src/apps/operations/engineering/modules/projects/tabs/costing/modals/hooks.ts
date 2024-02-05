import { useCallback, useEffect, useMemo } from "react";
import { useForm, UseFormReturnType, yupResolver } from "@mantine/form";

import { COMMON_BOARD_SIZE, FLUTE_TYPES, tab } from "./constants";
import { useCostingContext } from "./context";
import { rscSchema } from "./schema";
import { SpecificationsValue } from "./types";

export const useSpecifications = (): [
  UseFormReturnType<SpecificationsValue>,
  (value?: SpecificationsValue) => Promise<void>,
] => {
  const { specifications, setSpecsValue, nextStep } = useCostingContext();

  const form = useForm<SpecificationsValue>({
    initialValues: specifications,
    validate: yupResolver(rscSchema),
  });

  console.log(form.values, "vales");

  const handleSubmit = useCallback(
    async (value?: SpecificationsValue) => {
      nextStep();
      setSpecsValue(value as SpecificationsValue);
    },
    [nextStep, setSpecsValue],
  );

  const { values, setFieldValue } = form;

  const {
    length,
    width,
    height,
    dimensionType,
    flute,
    materialLength,
    materialWidth,
    useCommonBoard,
    materialLengthInches,
    materialWidthInches,
    yieldOne,
    buyingPrice,
  } = values;

  const thickness = useMemo(() => {
    const selectedFlute = FLUTE_TYPES.find((val) => val.flute === flute);
    if (selectedFlute) return selectedFlute.thickness;
    return 0;
  }, [flute]);

  useEffect(() => {
    if (width && height && length && flute) {
      if (dimensionType === "ID") {
        const idW = width + thickness + (height + thickness) + thickness * 3;
        const idL =
          2 * length + thickness + (2 * width + thickness) + tab - thickness / 2;
        setFieldValue("materialWidth", idW);
        setFieldValue("materialLength", idL);
      } else {
        const odW = width + height - thickness;
        const odL = length * 2 - thickness * 2 + (width * 2 - thickness * 2) + tab;
        setFieldValue("materialWidth", odW);
        setFieldValue("materialLength", odL);
      }
    }
  }, [length, width, dimensionType, thickness, height, flute]);

  useEffect(() => {
    if (materialLength && materialWidth) {
      setFieldValue("materialWidthInches", materialWidth / 25.4);
      setFieldValue("materialLengthInches", materialLength / 25.4 + 2);
    }
  }, [materialLength, materialWidth]);

  useEffect(() => {
    if (materialLength && materialWidth) {
      if (useCommonBoard) {
        const w = Math.floor(COMMON_BOARD_SIZE.width / materialWidth);
        const l = Math.floor(COMMON_BOARD_SIZE.length / materialLength);
        setFieldValue("yieldOne", w * l);
      } else setFieldValue("yieldOne", 0);
    }
  }, [useCommonBoard, materialLength, materialWidth]);

  useEffect(() => {
    if (materialWidthInches && materialLengthInches) {
      try {
        const price = (materialWidthInches * materialLengthInches) / 144;
        const finalPrice = (price * buyingPrice) / (yieldOne > 0 ? yieldOne : 1);

        setFieldValue("materialPrice", finalPrice);
        setFieldValue("materialPriceWithAllocation", finalPrice * 1.05);
      } catch (_e) {
        setFieldValue("yieldOne", 0);
      }
    }
  }, [materialWidthInches, materialLengthInches, yieldOne, buyingPrice]);

  useEffect(() => {
    form.setValues(specifications);
  }, [specifications]);

  return [form, handleSubmit];
};
