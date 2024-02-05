import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "common/components/toast";
import { SELECT_OPTIONS_CONFIG } from "common/constants";
import { AnyObject, ApiResponse } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import { useAppSelector } from "redux/hooks";
import api from "utils/api";
import { removeEmpty, transformSelectOptData } from "utils/helpers";

import { selectCustomerFilter } from "../../redux/selectors";

import { CUSTOMERS, CUSTOMERS_OPTIONS } from "./constants";
import { Customers } from "./types";

export const useGetCustomers = (): [Customers[], boolean, PaginateType] => {
  const paginate = usePaginate();
  const filter = useAppSelector(selectCustomerFilter);
  const { data, isLoading } = useQuery(
    [
      CUSTOMERS,
      removeEmpty({
        ...paginate.pageParams,
        ...filter,
      }),
    ],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Customers[]>> = await api.get(
          "/accounting/v1/sales/customers",
          {
            params: queryKey[1],
          },
        );
        paginate.onTotalChange(data?.meta?.final_page ?? 1);
        return data.data;
      } catch (_e) {
        return [];
      }
    },
  );
  return [data ?? [], isLoading, paginate];
};

export const useGetCustomerOptions = (
  returnCustomFormat = false,
): [ReturnType<typeof transformSelectOptData>, boolean] => {
  const { data, isLoading } = useQuery([CUSTOMERS_OPTIONS], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<Customers[]>> = await api.get(
        "/accounting/v1/sales/customers",
        {
          params: {
            ...SELECT_OPTIONS_CONFIG.params,
            sortBy: "name:asc",
          },
        },
      );

      if (returnCustomFormat) {
        return data?.data?.map((customer) => ({
          label: customer.name,
          value: `${customer.id}:::${customer.allow_multiple_dr}`,
        }));
      }

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

export const useCreateEditCustomer = (
  id: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    [CUSTOMERS],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = id
          ? await api.patch(
              `/accounting/v1/sales/customers/${payload?.id as number}`,
              payload,
            )
          : await api.post("/accounting/v1/sales/customers", payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries([CUSTOMERS]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useDeleteCustomer = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation([CUSTOMERS], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `/accounting/v1/sales/customers/${id}`,
      );

      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries([CUSTOMERS]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};
