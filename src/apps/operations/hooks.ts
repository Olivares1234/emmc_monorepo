import { useQuery } from "@tanstack/react-query";
import { Supplier } from "apps/accounting/purchases/modules/supplier/type";
import { Customers } from "apps/accounting/sales/modules/customers/types";
import { AxiosResponse } from "axios";
import { ApiResponse } from "common/types";
import api from "utils/api";
import { transformSelectOptData } from "utils/helpers";

import { OPERATIONS_CUSTOMER_OPT, OPERATIONS_SUPPLIER_OPT } from "./constants";

export const useOperationGetCustomerOptions = (): [
  ReturnType<typeof transformSelectOptData>,
  boolean,
] => {
  const { data, isLoading } = useQuery([OPERATIONS_CUSTOMER_OPT], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<Customers[]>> = await api.get(
        "/operation/v1/datasets/customers",
      );

      return transformSelectOptData(data?.data, {
        valueKey: "id",
        labelKey: "name",
      });
    } catch (_e) {
      return [];
    }
  });
  return [data ?? [], isLoading];
};

export const useOperationGetSupplierOptions = (): [
  ReturnType<typeof transformSelectOptData>,
  boolean,
] => {
  const { data, isLoading } = useQuery([OPERATIONS_SUPPLIER_OPT], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<Supplier[]>> = await api.get(
        "/operation/v1/datasets/suppliers",
      );

      return transformSelectOptData(data?.data, {
        valueKey: "id",
        labelKey: "name",
      });
    } catch (_e) {
      return [];
    }
  });
  return [data ?? [], isLoading];
};
