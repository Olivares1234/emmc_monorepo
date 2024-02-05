import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "common/components/toast";
import { AnyObject, ApiResponse } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import api from "utils/api";
import { removeEmpty } from "utils/helpers";

import { CHECK_ITEMS } from "./constants";
import { CheckItems } from "./types";

export const useGetCheckItems = (): [
  CheckItems[],
  boolean,
  PaginateType & Record<string, any>,
] => {
  const paginate = usePaginate();
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    [`${CHECK_ITEMS}/${id}`, removeEmpty(paginate.pageParams)],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<CheckItems[]>> = await api.get(
          `/accounting/v1/cdb/checks/${id}/items`,
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

export const useCreateCheckItems = (
  id: number,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const queryKey = `${CHECK_ITEMS}/${id}`;
  const { mutateAsync, isLoading } = useMutation(
    [queryKey],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = await api.post(
          `/accounting/v1/cdb/checks/${id}/items`,
          payload,
        );

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries([queryKey]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useDeleteCheckItems = (
  checkId: number,
): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const queryKey = `${CHECK_ITEMS}/${checkId}`;
  const { mutateAsync, isLoading } = useMutation([queryKey], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `/accounting/v1/cdb/checks/${checkId}/items/${id}`,
      );

      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries([queryKey]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};
