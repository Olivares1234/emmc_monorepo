import { useParams } from "react-router-dom";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useDisplayEntryModal } from "common/accounting/hooks";
import { openToast } from "common/components/toast";
import { DEFAULT_RESPONSE_LIST } from "common/constants";
import { AnyObject, ApiResponse, ApiResponseWithEntries } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import { useAppSelector } from "redux/hooks";
import api from "utils/api";
import { removeEmpty } from "utils/helpers";

import { selectCollectionFilter } from "../../redux/selectors";
import { INVOICE_COLLECTION, INVOICE_INFO, INVOICES } from "../invoices/constants";
import { Invoice } from "../invoices/types";

import { COLLECTIONS, COLLECTIONS_INFO, COLLECTIONS_INVOICE } from "./constants";
import { Collection } from "./types";

export const useGetCollections = (): [
  ApiResponse<Collection[]>,
  boolean,
  PaginateType,
] => {
  const paginate = usePaginate();
  const filter = useAppSelector(selectCollectionFilter);

  const { data, isFetching, isLoading } = useQuery(
    [
      COLLECTIONS,
      removeEmpty({
        ...paginate.pageParams,
        ...filter,
      }),
    ],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Invoice[]>> = await api.get(
          "/accounting/v1/sales/collections",
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

export const useGetSingleCollection = (
  collectionId: number | null = null,
  checkIdParam = true,
): [Collection, boolean, Omit<UseQueryResult, "data" | "isFetching">] => {
  const { id } = useParams();

  const { data, isFetching, ...options } = useQuery(
    [COLLECTIONS_INFO, collectionId ?? id],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Collection>> = await api.get(
          `/accounting/v1/sales/collections/${queryKey[1] as string}`,
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
  return [data as Collection, isFetching, options];
};

export const useGetCollectionInvoice = (): [
  Invoice[],
  boolean,
  PaginateType & Record<string, any>,
] => {
  const paginate = usePaginate();
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    [`${COLLECTIONS_INVOICE}/${id}`, removeEmpty(paginate.pageParams)],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Invoice[]>> = await api.get(
          `/accounting/v1/sales/collections/${id}/invoices`,
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

export const useCreateUpdateInvoiceCollection = (
  collectionId: number | null = null,
  invalidateInvoiceDetails: boolean = false,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const queryKey = `${COLLECTIONS}`;
  const displayEntry = useDisplayEntryModal();

  const { mutateAsync, isLoading } = useMutation(
    [queryKey],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponseWithEntries> = collectionId
          ? await api.patch(`/accounting/v1/sales/collections/${payload.id}`, payload)
          : await api.post(`/accounting/v1/sales/collections`, payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        if (invalidateInvoiceDetails) {
          client.invalidateQueries([INVOICE_COLLECTION]);
          client.invalidateQueries([INVOICE_INFO]);
          client.invalidateQueries([INVOICES]);
        } else client.invalidateQueries([queryKey]);

        displayEntry(data?.new_entries ?? []);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};
