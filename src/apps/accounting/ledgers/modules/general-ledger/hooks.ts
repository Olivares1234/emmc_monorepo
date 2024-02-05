import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { AccountingEntry, ApiResponse } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import { useAppSelector } from "redux/hooks";
import api from "utils/api";
import { removeEmpty } from "utils/helpers";

import { selectGeneralLedgerFilter } from "../../redux/selectors";

import { GENERAL_LEDGER } from "./constants";
import { GeneralLedgers } from "./types";

export const useGetGeneralLedger = (): [GeneralLedgers, boolean, PaginateType] => {
  const paginate = usePaginate();
  const filter = useAppSelector(selectGeneralLedgerFilter);
  const { data, isLoading } = useQuery(
    [
      GENERAL_LEDGER,
      removeEmpty({
        ...paginate.pageParams,
        ...filter,
      }),
    ],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<GeneralLedgers>> = await api.get(
          "/accounting/v1/ledger/general",
          {
            params: queryKey[1],
          },
        );
        paginate.onTotalChange(data?.meta?.final_page ?? 1);
        return data.data?.map((gl) => {
          gl.credit = gl.type === AccountingEntry.Credit ? gl.amount : 0;
          gl.debit = gl.type === AccountingEntry.Debit ? gl.amount : 0;
          return gl;
        });
      } catch (_e) {
        return [];
      }
    },
  );
  return [data ?? [], isLoading, paginate];
};
