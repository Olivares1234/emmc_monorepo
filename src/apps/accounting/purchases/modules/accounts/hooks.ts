import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "common/components/toast";
import { SELECT_OPTIONS_CONFIG } from "common/constants";
import { AnyObject, ApiResponse } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import api from "utils/api";
import { transformSelectOptData } from "utils/helpers";

import { ACCOUNTS, ACCOUNTS_OPTIONS } from "./constants";
import { Accounts } from "./type";

export const useGetAccounts = (): [Accounts[], boolean, PaginateType] => {
  const paginate = usePaginate();
  const { data, isLoading } = useQuery(
    [ACCOUNTS, paginate.pageParams],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Accounts[]>> = await api.get(
          "/accounting/v1/purchases/accounts",
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

export const useGetAccountsOptions = (
  returnCustomFormat = false,
): [ReturnType<typeof transformSelectOptData>, boolean] => {
  const { data, isLoading } = useQuery([ACCOUNTS_OPTIONS], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<Accounts[]>> = await api.get(
        "/accounting/v1/purchases/accounts",
        SELECT_OPTIONS_CONFIG,
      );

      if (returnCustomFormat) {
        return data?.data?.map((account) => ({
          label: account.code,
          value: `${account.id}:::${account.title}`,
        }));
      }

      return transformSelectOptData(data?.data, {
        valueKey: "id",
        labelKey: "code",
      });
    } catch (_e) {
      return [];
    }
  });
  return [data ?? [], isLoading];
};

export const useCreateEditAccounts = (
  id: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    [ACCOUNTS],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = id
          ? await api.patch(
              `/accounting/v1/purchases/accounts/${payload?.id as number}`,
              payload,
            )
          : await api.post("/accounting/v1/purchases/accounts", payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries([ACCOUNTS]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useDeleteAccounts = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation([ACCOUNTS], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `/accounting/v1/purchases/accounts/${id}`,
      );

      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries([ACCOUNTS]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};
