import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { SUPER_ADMIN } from "common/components/roles/constants";
import { openToast } from "common/components/toast";
import { SELECT_OPTIONS_CONFIG } from "common/constants";
import { AnyObject, ApiResponse } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import api from "utils/api";
import { transformSelectOptData } from "utils/helpers";

import { RoleType } from "./types";

export const useGetRoles = (): [RoleType[], boolean, PaginateType] => {
  const paginate = usePaginate();
  const { data, isLoading } = useQuery(
    ["ROLES", paginate.pageParams],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<RoleType[]>> = await api.get(
          "/auth/roles",
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

export const useGetRolesOptions = (): [
  ReturnType<typeof transformSelectOptData>,
  boolean,
] => {
  const { data, isLoading } = useQuery(["ROLES/OPTIONS"], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<RoleType[]>> = await api.get(
        "/auth/roles",
        SELECT_OPTIONS_CONFIG,
      );
      return transformSelectOptData(data?.data, {
        valueKey: "id",
        labelKey: "role",
      })?.filter((d) => !SUPER_ADMIN.includes(d?.label));
    } catch (_e) {
      return [];
    }
  });
  return [data ?? [], isLoading];
};

export const useCreateRole = (): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    ["ROLES"],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = await api.post(
          "/auth/roles",
          payload,
        );
        openToast({
          type: "success",
          message: data?.message ?? "",
        });

        client.invalidateQueries(["ROLES"]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useDeleteRole = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(["ROLES"], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(`/auth/roles/${id}`);
      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries(["ROLES"]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};
