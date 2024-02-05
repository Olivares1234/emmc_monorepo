import { DescriptionFormat } from "common/components/description";
import { camelToSnakeString, startCase } from "utils/helpers";

import { rscDefaultValue } from "./constants";

export const RSC_DESCRIPTION_FORMAT: DescriptionFormat[] = Object.keys(
  rscDefaultValue,
).map((key) => ({
  key,
  label: startCase(camelToSnakeString(key)),
}));
