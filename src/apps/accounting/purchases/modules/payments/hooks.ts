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
import { removeEmpty } from "utils/helpers";

import { selectPaymentsFilter } from "../../redux/selectors";
import { PURCHASES, PURCHASES_INFO, PURCHASES_PAYMENTS } from "../purchases/constants";
import { Purchases } from "../purchases/types";

import { PAYMENTS, PAYMENTS_INFO, PAYMENTS_PO } from "./constants";
import { Payments } from "./types";

export const useGetPayments = (): [ApiResponse<Payments[]>, boolean, PaginateType] => {
  const paginate = usePaginate();
  const filter = useAppSelector(selectPaymentsFilter);

  const { data, isFetching, isLoading } = useQuery(
    [
      PAYMENTS,
      removeEmpty({
        ...paginate.pageParams,
        ...filter,
      }),
    ],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Purchases[]>> = await api.get(
          "/accounting/v1/purchases/payments",
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

export const useGetSinglePayments = (
  collectionId: number | null = null,
  checkIdParam = true,
): [Payments, boolean, Omit<UseQueryResult, "data" | "isFetching">] => {
  const { id } = useParams();

  const { data, isFetching, ...options } = useQuery(
    [PAYMENTS_INFO, collectionId ?? id],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Payments>> = await api.get(
          `/accounting/v1/purchases/payments/${queryKey[1] as string}`,
        );
        return data.data;
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
    {
      enabled: !!(checkIdParam ? id : collectionId),
    },
  );
  return [data as Payments, isFetching, options];
};

export const useGetPaymentsPurchaseOrder = (): [
  Purchases[],
  boolean,
  PaginateType & Record<string, any>,
] => {
  const paginate = usePaginate();
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    [`${PAYMENTS_PO}/${id}`, removeEmpty(paginate.pageParams)],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Purchases[]>> = await api.get(
          `/accounting/v1/purchases/payments/${id}/purchases`,
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

export const useCreateUpdatePurchaseOrderPayments = (
  paymentsId: number | null = null,
  invalidatePurchasesDetails: boolean = false,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const queryKey = `${PAYMENTS}`;

  const { mutateAsync, isLoading } = useMutation(
    [queryKey],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = paymentsId
          ? await api.patch(`/accounting/v1/purchases/payments/${payload.id}`, payload)
          : await api.post(`/accounting/v1/purchases/payments`, payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        if (invalidatePurchasesDetails) {
          client.invalidateQueries([PURCHASES_PAYMENTS]);
          client.invalidateQueries([PURCHASES_INFO]);
          client.invalidateQueries([PURCHASES]);
        } else client.invalidateQueries([queryKey]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};
