import { startCase } from "utils/helpers";
import * as yup from "yup";

import { Template, TemplateFieldkeys } from "../types";

export const templatesDefaultData: Template = {
  name: "",
  fontSize: "8",
  fontStyle: "Times New Roman",
  width: 8,
  height: 5,
  specs: [],
};

export const templatesSchema = yup.object().shape({
  name: yup
    .string()
    .nullable()
    .required("Template Title is required")
    .matches(
      /^[a-zA-Z0-9\s-_ ]+$/,
      "Template Title should only contain letters, numbers, spaces, and dashes",
    )
    .label("Template Title"),
  specs: yup.array(yup.object()).min(1).label("Template Specifications"),
});

export const sortOptions = [
  {
    label: "Title descending",
    value: "title_no:desc",
  },
];

export const fieldOptions = Object.keys(TemplateFieldkeys).map((k) => ({
  label: startCase(k),
  value: k,
}));

export const fontSizes = ["8", "10", "12", "14", "16", "18", "20"];
export const fontStyles = ["Times New Roman", "Arial"];
