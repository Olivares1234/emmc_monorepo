import { ReactNode } from "react";

export enum ItemTypes {
  Box = "Box",
}

export type BoxValues = Record<
  string,
  {
    top: number;
    left: number;
    title: string;
  }
>;

export interface BoxProps {
  id: string;
  left: number;
  top: number;
  children?: ReactNode;
  fontFamily: string;
}
