import { ReactNode } from "react";
import { DateFormat } from "common/types";
import { AnyObject } from "yup";

export interface DescriptionFormat {
  key: string | number;
  label: ReactNode;
  customRender?: () => ReactNode;
  formatAsDate?: DateFormat;
}

export interface DescriptionProps {
  data: AnyObject;
  format: DescriptionFormat[];
  columns: number;
}

export interface StatusProps {
  status: string;
  colors: Record<string, AnyObject>;
}
