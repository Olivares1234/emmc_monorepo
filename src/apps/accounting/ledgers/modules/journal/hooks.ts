import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useDisplayEntryModal } from "common/accounting/hooks";
import { openToast } from "common/components/toast";
import {
  AccountingEntry,
  AnyObject,
  ApiResponse,
  ApiResponseWithEntries,
} from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import { useAppSelector } from "redux/hooks";
import api from "utils/api";
import { removeEmpty } from "utils/helpers";

import { selectJournalFilter } from "../../redux/selectors";

import { JOURNALS } from "./constants";
import { Journal, Journals } from "./types";

export const useGetJournals = (): [Journals, boolean, PaginateType] => {
  const paginate = usePaginate();
  const filter = useAppSelector(selectJournalFilter);
  const { data, isLoading } = useQuery(
    [
      JOURNALS,
      removeEmpty({
        ...paginate.pageParams,
        ...filter,
      }),
    ],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Journals>> = await api.get(
          "/accounting/v1/ledger/journal",
          {
            params: queryKey[1],
          },
        );
        paginate.onTotalChange(data?.meta?.final_page ?? 1);
        return data.data?.map((jnl) => {
          jnl.credit = jnl.type === AccountingEntry.Credit ? jnl.amount : 0;
          jnl.debit = jnl.type === AccountingEntry.Debit ? jnl.amount : 0;
          return jnl;
        });
      } catch (_e) {
        return [];
      }
    },
  );
  return [data ?? [], isLoading, paginate];
};

export const useCreateEditJournal = (
  id: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const displayEntryModal = useDisplayEntryModal();
  const { mutateAsync, isLoading } = useMutation(
    [JOURNALS],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponseWithEntries<Journal>> = id
          ? await api.patch(
              `/accounting/v1/ledger/journal/${payload?.id as number}`,
              payload,
            )
          : await api.post("/accounting/v1/ledger/journal", payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries([JOURNALS]);
        displayEntryModal(data?.new_entries ?? []);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useDeleteJournal = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation([JOURNALS], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `/accounting/v1/ledger/journal/${id}`,
      );

      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries([JOURNALS]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};
