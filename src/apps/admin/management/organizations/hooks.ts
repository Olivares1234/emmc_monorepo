import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "common/components/toast";
import { SELECT_OPTIONS_CONFIG } from "common/constants";
import { AnyObject, ApiResponse } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import api from "utils/api";
import { transformSelectOptData } from "utils/helpers";

import { OrganizationType } from "./types";

export const useGetOrganizations = (): [OrganizationType[], boolean, PaginateType] => {
  const paginate = usePaginate();
  const { data, isLoading, isRefetching } = useQuery(
    ["ORGANIZATIONS", paginate.pageParams],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<OrganizationType[]>> = await api.get(
          "/auth/organizations",
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
  return [data ?? [], isLoading || isRefetching, paginate];
};

export const useGetOrganizationOptions = (): [
  ReturnType<typeof transformSelectOptData>,
  boolean,
] => {
  const { data, isLoading } = useQuery(["ORGANIZATIONS/OPTIONS"], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<OrganizationType[]>> = await api.get(
        "/auth/organizations",
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

export const useCreateEditOrganizations = (
  id: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    ["ORGANIZATIONS"],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = id
          ? await api.patch(`/auth/organizations/${payload?.id as number}`, payload)
          : await api.post("/auth/organizations", payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries(["ORGANIZATIONS"]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useDeleteOrganization = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    ["ORGANIZATIONS"],
    async (id: number) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = await api.delete(
          `/auth/organizations/${id}`,
        );
        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries(["ORGANIZATIONS"]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};
