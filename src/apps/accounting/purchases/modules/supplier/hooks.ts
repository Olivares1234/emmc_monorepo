import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ModuleType } from "apps/admin/management/modules/types";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "common/components/toast";
import { SELECT_OPTIONS_CONFIG } from "common/constants";
import { AnyObject, ApiResponse } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import api from "utils/api";
import { transformSelectOptData } from "utils/helpers";

import { SUPPLIER, SUPPLIER_OPTIONS } from "./constants";
import { Supplier } from "./type";

export const useGetSupplier = (): [Supplier[], boolean, PaginateType] => {
  const paginate = usePaginate();
  const { data, isLoading } = useQuery(
    [SUPPLIER, paginate.pageParams],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Supplier[]>> = await api.get(
          "/accounting/v1/purchases/suppliers",
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

export const useGetSuplierOptions = (): [
  ReturnType<typeof transformSelectOptData>,
  boolean,
] => {
  const { data, isLoading } = useQuery([SUPPLIER_OPTIONS], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<ModuleType[]>> = await api.get(
        "/accounting/v1/purchases/suppliers",
        SELECT_OPTIONS_CONFIG,
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

export const useCreateEditSupplier = (
  id: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    [SUPPLIER],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = id
          ? await api.patch(
              `/accounting/v1/purchases/suppliers/${payload?.id as number}`,
              payload,
            )
          : await api.post("/accounting/v1/purchases/suppliers", payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries([SUPPLIER]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useDeleteSupplier = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation([SUPPLIER], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `/accounting/v1/purchases/suppliers/${id}`,
      );

      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries([SUPPLIER]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};
