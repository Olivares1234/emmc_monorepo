import { ReactNode } from "react";

export interface NavMenuTypes {
  path: string;
  label: string;
}

export interface LayoutTypes {
  children: JSX.Element | ReactNode;
  navMenu?: NavMenuTypes[];
  footer?: JSX.Element | ReactNode;
  title: ReactNode | string;
}
