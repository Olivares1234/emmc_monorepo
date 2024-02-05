import * as yup from "yup";

export const schema = yup.object().shape({
  length: yup.string().required().label("Lenght"),
  width: yup.string().required().label("Width"),
  height: yup.date().max(new Date()).required().label("Height"),
  dimensionType: yup.string().required().label("Dimension Type"),
  flute: yup.string().required().label("Flute"),
  materialLength: yup.string().required().label("Material Length"),
  materialWidth: yup.string().required().label("Material Width"),
  useCommonBoard: yup.string().required().label("Use Common Board"),
  materialLengthInches: yup.string().required().label("Material Length(Inches)"),
  materialWidthInches: yup.string().required().label("Material Width(Inches)"),
  yieldOne: yup.string().required().label("Yield One"),
  buyingPrice: yup.string().required().label("Buying Price"),
});

export const laborSchema = yup.object().shape({
  creasing: yup.number().required().label("Creasing"),
  printing: yup.number().required().label("Printing"),
  slotting: yup.number().required().label("Slotting"),
  gluing: yup.number().required().label("Gluing"),
  stitching: yup.number().required().label("Stitching"),
  clapper: yup.number().required().label("Clapper"),
  detaching: yup.number().required().label("Detaching"),
  manualCutting: yup.number().required().label("Manual Cutting"),
  bandsaw: yup.number().required().label("Bandsaw"),
  verticalDiecut: yup.number().required().label("Vertical Diecut"),
  preAssy: yup.number().required().label("Pre-Assy"),
  assy: yup.number().required().label("Assy"),
  checking: yup.number().required().label("Checking"),
  packing: yup.number().required().label("Packing"),
});

export const printingSchema = yup.object().shape({
  cyrill: yup.number().required().label("Cyrill"),
  ink: yup.number().required().label("Ink"),
  varnish: yup.number().required().label("Varnish"),
  adhesiveStaple: yup.number().required().label("Adhesive Staple"),
  plasticStraw: yup.number().required().label("Plastic Straw"),
});
