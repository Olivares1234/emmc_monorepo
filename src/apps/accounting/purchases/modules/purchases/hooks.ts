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
import { PaginateDefaultValue, PaginateType, usePaginate } from "hooks/usePaginate";
import { useAppSelector } from "redux/hooks";
import api from "utils/api";
import { removeEmpty, transformSelectOptData } from "utils/helpers";

import { selectPurchaseOrderFilter } from "../../redux/selectors";

import { PURCHASES, PURCHASES_INFO, PURCHASES_ITEMS } from "./constants";
import { Purchases, PurchasesItem } from "./types";

export const useGetPurchases = (
  defaultPagination: undefined | PaginateDefaultValue = undefined,
): [ApiResponse<Purchases[]>, boolean, PaginateType] => {
  const paginate = usePaginate(defaultPagination);
  const filter = useAppSelector(selectPurchaseOrderFilter);

  const { data, isFetching, isLoading } = useQuery(
    [
      PURCHASES,
      removeEmpty({
        ...paginate.pageParams,
        ...filter,
      }),
    ],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Purchases[]>> = await api.get(
          "/accounting/v1/purchases/purchases",
          {
            params: queryKey[1],
          },
        );
        paginate.onTotalChange(data?.meta?.final_page ?? 1);
        return data;
      } catch (_e) {
        return [];
      }
    },
  );
  return [data ?? DEFAULT_RESPONSE_LIST, isFetching || isLoading, paginate];
};

export const useGetSinglePurchases = (): [
  Purchases,
  boolean,
  Omit<UseQueryResult, "data" | "isLoading">,
] => {
  const { id } = useParams();
  const { data, isLoading, ...options } = useQuery(
    [PURCHASES_INFO, id],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Purchases>> = await api.get(
          `/accounting/v1/purchases/purchases/${queryKey[1] as string}`,
        );
        return data.data;
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [data as Purchases, isLoading, options];
};

export const useGetPurchasesOptions = (
  supplier: string | undefined = undefined,
): [ReturnType<typeof transformSelectOptData>, boolean] => {
  const { data, isLoading } = useQuery(
    [`PURCHASES_OPTIONS/${supplier}`],
    async () => {
      try {
        const { data }: AxiosResponse<ApiResponse<Purchases[]>> = await api.get(
          "/accounting/v1/purchases/purchases",
          {
            params: {
              page: 1,
              limit: 99999999,
              status: "Not_Paid",
              supplier,
            },
          },
        );

        return transformSelectOptData(data?.data, {
          valueKey: "id",
          labelKey: "invoice_no",
        });
      } catch (_e) {
        return [];
      }
    },
    {
      enabled: !!supplier,
    },
  );
  return [data ?? [], isLoading];
};

export const useCreateEditPurchases = (
  id: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    [PURCHASES],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = id
          ? await api.patch(
              `/accounting/v1/purchases/purchases/${payload?.id as number}`,
              payload,
            )
          : await api.post("/accounting/v1/purchases/purchases", payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries([PURCHASES]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useGetPurchasesItems = (): [
  PurchasesItem[],
  boolean,
  PaginateType & Record<string, any>,
] => {
  const paginate = usePaginate();
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    [`${PURCHASES_ITEMS}/${id}`, removeEmpty(paginate.pageParams)],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<PurchasesItem[]>> = await api.get(
          `/accounting/v1/purchases/purchases/${id}/items`,
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

export const useDeletePurchases = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation([PURCHASES], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `/accounting/v1/purchases/purchases/${id}`,
      );

      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries([PURCHASES]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};

export const useCreateUpdatePurchasesItem = (
  purchasesId: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const queryKey = `${PURCHASES_ITEMS}/${purchasesId}`;

  const { mutateAsync, isLoading } = useMutation(
    [queryKey],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = payload?.id
          ? await api.patch(
              `/accounting/v1/purchases/purchases-items/${payload?.id}`,
              payload,
            )
          : await api.post(
              `/accounting/v1/purchases/purchases/${purchasesId}/items`,
              payload,
            );

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries([queryKey]);
        client.invalidateQueries([PURCHASES_INFO]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useDeletePurchasesItem = (
  purchasesId: number,
): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const queryKey = `${PURCHASES_ITEMS}/${purchasesId}`;
  const { mutateAsync, isLoading } = useMutation([queryKey], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `/accounting/v1/purchases/purchases/${purchasesId}/items/${id}`,
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
