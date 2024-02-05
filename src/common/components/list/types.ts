import { FC, ReactNode } from "react";
import { AnyObject } from "common/types";
import { PaginateType } from "hooks/usePaginate";
import { TRootState } from "redux/store";

export interface ListProps<T = AnyObject> {
  data: AnyObject[];
  isLoading?: boolean;
  dataKey: string;
  item: (d: T) => JSX.Element | ReactNode;
  emptyMessage?: string | JSX.Element;
  pagination?: PaginateType | undefined;
}

export interface ListSearch {
  onChange: (val: AnyObject) => void;
  advanceFilterElement?: FC<AdvanceFilterModalProps>;
  showInputOnly?: boolean;
  filterSelector?: (state: TRootState) => AnyObject;
}

export interface AdvanceFilterModalProps {
  onClose: () => void;
  onChange: ListSearch["onChange"];
}
