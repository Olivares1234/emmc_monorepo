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
import { PaginateDefaultValue, PaginateType, usePaginate } from "hooks/usePaginate";
import { useAppSelector } from "redux/hooks";
import api from "utils/api";
import { removeEmpty, transformSelectOptData } from "utils/helpers";

import { selectInvoiceFilter } from "../../redux/selectors";

import { INVOICE_INFO, INVOICE_ITEMS, INVOICES } from "./constants";
import { Invoice, InvoiceItem, InvoiceTotal } from "./types";

export const useGetInvoices = (
  defaultPagination: undefined | PaginateDefaultValue = undefined,
): [ApiResponse<Invoice[]>, boolean, PaginateType] => {
  const paginate = usePaginate(defaultPagination);
  const filter = useAppSelector(selectInvoiceFilter);

  const { data, isFetching, isLoading } = useQuery(
    [
      INVOICES,
      removeEmpty({
        ...paginate.pageParams,
        ...filter,
      }),
    ],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Invoice[]>> = await api.get(
          "/accounting/v1/sales/invoices",
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

export const useGetSingleInvoice = (): [
  Invoice,
  boolean,
  Omit<UseQueryResult, "data" | "isFetching">,
] => {
  const { id } = useParams();
  const { data, isFetching, ...options } = useQuery(
    [INVOICE_INFO, id],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Invoice>> = await api.get(
          `/accounting/v1/sales/invoices/${queryKey[1] as string}`,
        );
        return data.data;
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [data as Invoice, isFetching, options];
};

export const useGetInvoiceOptions = (
  customer: string | undefined = undefined,
): [ReturnType<typeof transformSelectOptData>, boolean] => {
  const { data, isLoading } = useQuery(
    [`INVOICE_OPTIONS/${customer}`],
    async () => {
      try {
        const { data }: AxiosResponse<ApiResponse<Invoice[]>> = await api.get(
          "/accounting/v1/sales/invoices",
          {
            params: {
              page: 1,
              limit: 99999999,
              status: "Not_Collected",
              customer,
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
      enabled: !!customer,
    },
  );
  return [data ?? [], isLoading];
};

export const useGetInvoiceTotals = (ids: number[]): [InvoiceTotal[], boolean] => {
  const { data, isFetching } = useQuery(
    [`INVOICE_OPTIONS`, ids],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<InvoiceTotal[]>> = await api.get(
          "/accounting/v1/sales/invoices/data/total",
          {
            params: {
              ids: (queryKey[1] as number[])?.join(","),
            },
          },
        );
        return data.data;
      } catch (_e) {
        return [];
      }
    },
    {
      enabled: ids.length > 0,
    },
  );
  return [data ?? [], isFetching];
};

export const useCreateEditInvoice = (
  id: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const displayEntry = useDisplayEntryModal();

  const { mutateAsync, isLoading } = useMutation(
    [INVOICES],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponseWithEntries<Invoice>> = id
          ? await api.patch(
              `/accounting/v1/sales/invoices/${payload?.id as number}`,
              payload,
            )
          : await api.post("/accounting/v1/sales/invoices", payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        await client.invalidateQueries([INVOICES]);
        displayEntry(data?.new_entries ?? []);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useGetInvoiceItems = (): [
  InvoiceItem[],
  boolean,
  PaginateType & Record<string, any>,
] => {
  const paginate = usePaginate();
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    [`${INVOICE_ITEMS}/${id}`, removeEmpty(paginate.pageParams)],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<InvoiceItem[]>> = await api.get(
          `/accounting/v1/sales/invoices/${id}/items`,
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

export const useDeleteInvoice = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation([INVOICES], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `/accounting/v1/sales/invoices/${id}`,
      );

      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries([INVOICES]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};

export const useCreateUpdateInvoiceItem = (
  invoiceId: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const queryKey = `${INVOICE_ITEMS}/${invoiceId}`;

  const { mutateAsync, isLoading } = useMutation(
    [queryKey],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = payload?.id
          ? await api.patch(`/accounting/v1/sales/invoices-items/${payload?.id}`, payload)
          : await api.post(`/accounting/v1/sales/invoices/${invoiceId}/items`, payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries([queryKey]);
        client.invalidateQueries([INVOICE_INFO]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useDeleteInvoiceItem = (
  invoiceId: number,
): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const queryKey = `${INVOICE_ITEMS}/${invoiceId}`;
  const { mutateAsync, isLoading } = useMutation([queryKey], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `/accounting/v1/sales/invoices-items/${id}`,
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

export const useUpdateInvoiceStatus = (
  id: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    [`${INVOICES}/STATUS`],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Invoice>> = await api.patch(
          `/accounting/v1/sales/invoices/${id}/status`,
          payload,
        );

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        await client.invalidateQueries([INVOICES]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};
