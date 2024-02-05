import { useParams } from "react-router-dom";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "common/components/toast";
import { DEFAULT_RESPONSE_LIST } from "common/constants";
import { AnyObject, ApiResponse } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import { useAppSelector } from "redux/hooks";
import api from "utils/api";
import { removeEmpty, snakeCaseKeysToCamelCase } from "utils/helpers";

import { selectCdbVoucherFilter } from "../../redux/selectors";

import { CHECK_INFO, CHECKS } from "./constants";
import { Check, Checks } from "./types";

export const useGetChecks = (): [ApiResponse<Checks[]>, boolean, PaginateType] => {
  const paginate = usePaginate();
  const filter = useAppSelector(selectCdbVoucherFilter);
  const { data, isLoading } = useQuery(
    [
      CHECKS,
      removeEmpty({
        ...paginate.pageParams,
        ...filter,
      }),
    ],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Checks[]>> = await api.get(
          "/accounting/v1/cdb/checks",
          {
            params: queryKey[1],
          },
        );
        paginate.onTotalChange(data?.meta?.final_page ?? 1);
        return snakeCaseKeysToCamelCase(data);
      } catch (_e) {
        return [];
      }
    },
  );
  return [data ?? DEFAULT_RESPONSE_LIST, isLoading, paginate];
};

export const useGetSingleCheck = (): [
  Check,
  boolean,
  Omit<UseQueryResult, "data" | "isLoading">,
] => {
  const { id } = useParams();
  const { data, isLoading, ...options } = useQuery(
    [CHECK_INFO, id],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Check>> = await api.get(
          `/accounting/v1/cdb/checks/${queryKey[1] as string}`,
        );
        return snakeCaseKeysToCamelCase(data.data);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [data as Check, isLoading, options];
};

export const useCreateEditChecks = (
  id: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation([CHECKS], async (payload: AnyObject) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = id
        ? await api.patch(`/accounting/v1/cdb/checks/${payload?.id as number}`, payload)
        : await api.post("/accounting/v1/cdb/checks/", payload);

      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries([CHECKS]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};

export const useDeleteChecks = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation([CHECKS], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `/accounting/v1/cdb/checks/${id}`,
      );

      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries([CHECKS]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};
