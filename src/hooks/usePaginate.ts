import { useState } from "react";

export interface PaginateType {
  value: number;
  limit: number;
  pageParams: {
    limit: number;
    page: number;
  };
  paginationProps: {
    value: number;
    onChange: (page: number) => void;
    total: number;
  };
  onChange: (page: number) => void;
  onTotalChange: (page: number) => void;
  onChangeLimit: (page: number) => void;
  total: number;
}

export interface PaginateDefaultValue {
  limit?: number;
  page?: number;
}

export const usePaginate = ({
  page,
  limit: defaultLimit,
}: PaginateDefaultValue = {}): PaginateType => {
  const [value, onChange] = useState(page ?? 1);
  const [limit, onChangeLimit] = useState(defaultLimit ?? 10);
  const [total, onTotalChange] = useState(1);

  return {
    value,
    onChange,
    total,
    onTotalChange,
    onChangeLimit,
    limit,
    pageParams: {
      page: value,
      limit,
    },
    paginationProps: {
      value,
      total,
      onChange,
    },
  };
};
