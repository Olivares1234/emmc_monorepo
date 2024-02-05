export const checksDefaultData = {
  datePrepared: null,
  checkDate: null,
  voucherDate: null,
  checkNumber: "",
  voucherNumber: "",
  payeesName: "",
  items: [],
};

export const checkItemDefaultData = {
  type: "",
  accountId: null,
  amount: 0,
  explanation: "",
  department: "",
  subTotal: 0,
  total: 0,
};

export const departmentOpt = [
  "Accounting",
  "Management",
  "Logistic",
  "Information_Technology",
  "Customer_Service",
  "Warehouse",
  "Production",
  "Impex",
  "Human_Resources",
  "Admin",
  "Engineering",
  "Purchasing",
  "Maintenance",
  "Planning",
  "Marketing",
  "Quality_Checker",
  "Auditor",
];

export const templateOpt = ["Department", "test1", "test2"];

export const sortOptions = [
  {
    label: "Check no. ascending",
    value: "check_number:asc",
  },
  {
    label: "Check no. descending",
    value: "check_number:desc",
  },
];
