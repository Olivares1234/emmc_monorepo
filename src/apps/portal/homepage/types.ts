import { IconType } from "react-icons";

export interface RouteListTypes {
  path: string;
  label: string;
  icon?: IconType;
  component: () => JSX.Element;
  description?: string;
}
