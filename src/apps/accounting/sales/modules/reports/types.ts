import { TSalesState } from "../../redux/salesSlice";

export interface ReportButtons {
  label: string;
  icon: JSX.Element;
  color: string;
  code: TSalesState["selectedReport"];
}
