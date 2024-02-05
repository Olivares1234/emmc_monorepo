import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "common/components/toast";
import { SELECT_OPTIONS_CONFIG } from "common/constants";
import { AnyObject, ApiResponse } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import api from "utils/api";
import { transformSelectOptData } from "utils/helpers";

import { ModuleType } from "./types";

export const useGetModules = (): [ModuleType[], boolean, PaginateType] => {
  const paginate = usePaginate();
  const { data, isLoading } = useQuery(
    ["MODULES", paginate.pageParams],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<ModuleType[]>> = await api.get(
          "/auth/modules",
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

export const useGetModuleOptions = (): [
  ReturnType<typeof transformSelectOptData>,
  boolean,
] => {
  const { data, isLoading } = useQuery(["MODULES/OPTIONS"], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<ModuleType[]>> = await api.get(
        "/auth/modules",
        SELECT_OPTIONS_CONFIG,
      );
      return transformSelectOptData(data?.data, {
        valueKey: "id",
        labelKey: "module",
      });
    } catch (_e) {
      return [];
    }
  });
  return [data ?? [], isLoading];
};

export const useCreateModules = (): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    ["MODULES"],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = await api.post(
          "/auth/modules",
          payload,
        );
        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries(["MODULES"]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useDeleteModule = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(["MODULES"], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `/auth/modules/${id}`,
      );

      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries(["MODULES"]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};
