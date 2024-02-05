import * as yup from "yup";

export const accountsDefaultData = {
  code: "",
  title: "",
};

export const accountsSchema = yup.object().shape({
  code: yup
    .string()
    .nullable()
    .required("Accounts Code is required")
    .matches(
      /^[0-9\s-_]+$/,
      "Accounts Code should only contain numbers, underscore, and dashes",
    )
    .label("Accounts Code"),
  title: yup
    .string()
    .nullable()
    .required("Accounts Title is required")
    .matches(
      /^[a-zA-Z0-9\s-_ ]+$/,
      "Accounts Title should only contain letters, numbers, spaces, and dashes",
    )
    .label("Accounts Title"),
});

export const sortOptions = [
  {
    label: "Code ascending",
    value: "code_no:asc",
  },
  {
    label: "Title descending",
    value: "title_no:desc",
  },
];
