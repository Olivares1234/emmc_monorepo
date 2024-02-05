import { TPurchasesState } from "../../redux/purchasesSlice";

export interface ReportButtons {
  label: string;
  icon: JSX.Element;
  color: string;
  code: TPurchasesState["selectedReport"];
}
