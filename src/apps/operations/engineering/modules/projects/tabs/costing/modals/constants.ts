import { ConsumablesForm, LaborsForm, SpecificationsValue } from "./types";

export const FLUTE_TYPES = [
  {
    flute: "A flute",
    thickness: 5,
  },
  {
    flute: "B flute",
    thickness: 3,
  },
  {
    flute: "C flute",
    thickness: 4,
  },
  {
    flute: "BC flute",
    thickness: 7,
  },
  {
    flute: "E flute",
    thickness: 2,
  },
  {
    flute: "BCC flute",
    thickness: 11,
  },
];

export const PAPER_COMBS = [
  "150-125-150 (single wall) KR",
  "150-125-150 (single wall) KL",
  "150-115-115-115-150 (2KR)",
  "150-115-115-115-150 (1KR)",
  "150-115-150-115-150 (3KR)",
  "150-125-125-125-150 (KL)",
  "200-125-125-125-200 (KL)",
];

export const COSTING_TYPES = ["RSC", "FOAM"];
export const tab = 40;

export const LENGTH_INPUT_TYPE: Array<SpecificationsValue["dimensionType"]> = [
  "ID",
  "OD",
];

export const COMMON_BOARD_SIZE = {
  width: 1700,
  length: 2400,
};

export const laborsDefault: LaborsForm = {
  labors: [],
  skip: false,
};

export const consumablesDefault: ConsumablesForm = {
  consumables: [],
  skip: false,
};

export const rscDefaultValue = {
  dimensionType: LENGTH_INPUT_TYPE[0],
  flute: "",
  paperCombination: "",
  moq: 0,
  length: 0,
  width: 0,
  height: 0,
  materialLength: 0,
  materialWidth: 0,
  buyingPrice: 0,
  requiredQtyPerSet: 0,
  materialLengthInches: 0,
  materialWidthInches: 0,
  yieldOne: 0,
  yieldTwo: 0,
  supplierId: null,
  useCommonBoard: false,
  materialPrice: 0,
  materialPriceWithAllocation: 0,
};

export const laborsOpt = [
  "creasing",
  "slotting",
  "printing",
  "gluing",
  "stitching",
  "clapper",
  "detaching",
  "manual_cutting",
  "bandsaw",
  "pre_assembly",
  "checking",
  "vertical_diecut",
  "assembly",
  "packing",
  "heating",
  "sealing",
  "hotmelt",
  "loading",
  "tying",
  "laminating",
];

export const consumablesOpt = [
  "ink",
  "cyrill",
  "varnish",
  "adhesive",
  "staple",
  "plastic_straw",
];

export const laborTableFormat = [
  {
    label: "Labor",
    colKey: "label",
  },
  {
    label: "Value",
    colKey: "value",
    width: 50,
  },
];

export const consumableTableFormat = [
  {
    label: "Consumable",
    colKey: "label",
  },
  {
    label: "Value",
    colKey: "value",
    width: 50,
  },
];
