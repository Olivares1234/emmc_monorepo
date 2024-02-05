import { Dispatch, SetStateAction } from "react";
import { Supplier } from "apps/accounting/purchases/modules/supplier/type";

import { Project } from "../../../types";

export interface Labor {
  value: number;
  label: string;
  name: string;
}

export interface Consumables {
  value: number;
  label: string;
  name: string;
}

export interface LaborsForm {
  skip: boolean;
  labors: Labor[];
}

export interface ConsumablesForm {
  consumables: Consumables[];
  skip: boolean;
}

export interface CostingContextValues {
  costingType: string;
  active: number;
  nextStep: () => void;
  prevStep: () => void;
  projectId: number;
  costingId?: number;
  specifications: SpecificationsValue;
  labors: LaborsForm;
  consumables: ConsumablesForm;
  setSpecsValue: Dispatch<SetStateAction<SpecificationsValue>>;
  setLaborsValue: Dispatch<SetStateAction<LaborsForm>>;
  setConsumablesValue: Dispatch<SetStateAction<ConsumablesForm>>;
}

export type SpecificationsValue = RscValues;

export interface RscValues {
  id?: number;
  dimensionType: "ID" | "OD";
  flute: string;
  paperCombination: string;
  moq: number;
  length: number;
  width: number;
  height: number;
  materialLength: number;
  materialWidth: number;
  buyingPrice: number;
  requiredQtyPerSet: number;
  materialLengthInches: number;
  materialWidthInches: number;
  supplierId: string | null;
  yieldOne: number;
  yieldTwo: number;
  useCommonBoard: boolean;
  materialPrice: number;
  materialPriceWithAllocation: number;
}

export interface CostingModalProps {
  projectId: number;
  costingId?: number;
}

export type CostingDetails = {
  supplier: Supplier;
  labors: Labor[];
  consumables: Consumables[];
  project: Project;
} & RscValues;
