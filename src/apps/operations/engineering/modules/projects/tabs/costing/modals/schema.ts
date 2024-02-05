import { COSTING_MIN_VAL } from "apps/operations/constants";
import * as yup from "yup";

export const rscSchema = yup.object().shape({
  dimensionType: yup.string().required().label("Dimension Type"),
  flute: yup.string().required().label("Flute"),
  paperCombination: yup.string().required().label("Paper Combination"),
  moq: yup.number().min(0).required().label("MOQ"),
  length: yup.number().min(0).required().label("Sales Type"),
  width: yup.number().min(0).required().label("Width"),
  height: yup.number().min(0).required().label("Height"),
  materialLength: yup.number().min(COSTING_MIN_VAL).required().label("Material Length"),
  materialWidth: yup.number().min(COSTING_MIN_VAL).nullable().label("Material Width"),
  buyingPrice: yup.number().min(COSTING_MIN_VAL).nullable().label("Buying Price"),
  requiredQtyPerSet: yup.string().required().label("Required Qty Per Set"),
  supplierId: yup.string().required().label("Supplier"),
  materialLengthInches: yup
    .number()
    .min(COSTING_MIN_VAL)
    .required()
    .label("Material Length Inches"),
  materialWidthInches: yup
    .number()
    .min(COSTING_MIN_VAL)
    .required()
    .label("Material Width Inches"),
});

export const laborsSchema = yup.object().shape({
  labors: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.number().min(COSTING_MIN_VAL).required().label("Value"),
      }),
    )
    .min(1)
    .required()
    .label("Labors"),
});

export const consumablesSchema = yup.object().shape({
  consumables: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.number().min(COSTING_MIN_VAL).required().label("Value"),
      }),
    )
    .min(1)
    .required()
    .label("Consumables"),
});
