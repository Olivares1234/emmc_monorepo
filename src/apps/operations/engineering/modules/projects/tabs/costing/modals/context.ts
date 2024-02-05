import { createContext, useContext } from "react";

import { consumablesDefault, laborsDefault, rscDefaultValue } from "./constants";
import { CostingContextValues } from "./types";

export const CostingContext = createContext<CostingContextValues>({
  costingType: "",
  active: 0,
  nextStep: () => {
    //
  },
  prevStep: () => {
    //
  },
  specifications: rscDefaultValue,
  labors: laborsDefault,
  consumables: consumablesDefault,
  setConsumablesValue: () => {
    //
  },
  setLaborsValue: () => {
    //
  },
  setSpecsValue: () => {
    //
  },
  projectId: 0,
});

export const useCostingContext = () => useContext(CostingContext);
