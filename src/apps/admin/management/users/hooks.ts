import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserProfile } from "apps/portal/auth/types";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "common/components/toast";
import { AnyObject, ApiResponse } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import api from "utils/api";

export const useGetUsers = (): [UserProfile[], boolean, PaginateType] => {
  const paginate = usePaginate();
  const { data, isLoading } = useQuery(
    ["USERS", paginate.pageParams],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<UserProfile[]>> = await api.get(
          "/auth/users",
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

export const useCreateEditUsers = (
  id: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    ["USERS"],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = id
          ? await api.patch(`/auth/users/${payload?.id as number}`, payload)
          : await api.post("/auth/users", payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries(["USERS"]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useDeleteusers = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(["USERS"], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(`/auth/users/${id}`);
      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries(["USERS"]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};
