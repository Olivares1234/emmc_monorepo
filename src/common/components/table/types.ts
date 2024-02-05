import React, { ReactNode } from "react";
import { TableProps } from "@mantine/core";
import { DateFormat } from "common/types";
import { PaginateType } from "hooks/usePaginate";

export enum TableFormatTypes {
  DATE = "DATE",
  NUMBER = "NUMBER",
}

export interface TableFormatAs {
  type: TableFormatTypes;
  format: DateFormat | number;
}
export interface TableFormatType<T = any> {
  label?: string;
  colKey: string;
  defaultValue?: string | number;
  className?: string;
  customRender?: (val: T, i?: number) => ReactNode;
  width?: number | string;
  maxWidth?: number | string;
  withTooltip?: boolean;
  formatAs?: TableFormatAs;
}

export interface TableActionMenu<T = any> {
  label: string | JSX.Element;
  onClick: (val: T, i?: number) => void;
  disabled?: (val: T, i?: number) => boolean;
  hidden?: (val: T, i?: number) => boolean;
}

export interface TableTotalOptions {
  columnKeys: string[];
  precision?: number;
}

export interface TableFooterFormat {
  index: number;
  element: JSX.Element | React.ReactNode;
}

export interface TableType<T = any> {
  data: T[];
  key?: string;
  tableProps?: TableProps;
  isLoading?: boolean;
  format: Array<TableFormatType<T>>;
  actionMenu?: Array<TableActionMenu<T>>;
  emptyMessage?: string | JSX.Element;
  pagination?: PaginateType | undefined;
  showTotal?: TableTotalOptions;
  noScroll?: boolean;
  footer?: TableFooterFormat[];
  customRowClass?: (val: T, i?: number) => string;
}
