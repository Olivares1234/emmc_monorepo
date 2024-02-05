import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { SELECT_OPTIONS_CONFIG } from "common/constants";
import { ApiResponse } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import { useAppSelector } from "redux/hooks";
import api from "utils/api";
import { removeEmpty, transformSelectOptData } from "utils/helpers";

import { selectLogsFilter } from "../../redux/selectors";

import { LOGS, LOGS_OPTIONS } from "./constants";
import { Logs } from "./types";

export const useGetLogs = (): [Logs[], boolean, PaginateType] => {
  const paginate = usePaginate();
  const filter = useAppSelector(selectLogsFilter);
  const { data, isLoading } = useQuery(
    [
      LOGS,
      removeEmpty({
        ...paginate.pageParams,
        ...filter,
      }),
    ],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Logs[]>> = await api.get(
          "/accounting/v1/logs/SALES",
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

export const useGetLogsOptions = (
  returnCustomFormat = false,
): [ReturnType<typeof transformSelectOptData>, boolean] => {
  const { data, isLoading } = useQuery([LOGS_OPTIONS], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<Logs[]>> = await api.get(
        "/accounting/v1/sales/logs",
        {
          params: {
            ...SELECT_OPTIONS_CONFIG.params,
            sortBy: "name:asc",
          },
        },
      );

      if (returnCustomFormat) {
        return data?.data?.map((logs) => ({
          label: logs.email,
          value: `${logs.id}:::${logs.email}`,
        }));
      }

      return transformSelectOptData(data?.data, {
        valueKey: "id",
        labelKey: "name",
      });
    } catch (_e) {
      return [];
    }
  });
  return [data ?? [], isLoading];
};
