import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ApiResponse } from "common/types";
import api from "utils/api";

import { DASH_COLLECTED_STATS, DASHSALES_COUNT } from "./components/constants";
import { DueCollectedData } from "./types";

export const useGetDashCount = (): [data: Record<string, number>, isLoading: boolean] => {
  const { data, isLoading } = useQuery([DASHSALES_COUNT], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<Record<string, number>>> = await api.get(
        "/accounting/reports/dashboard-stats",
      );
      return data.data;
    } catch (_e) {
      return {
        customers_count: 0,
        invoice_count: 0,
        total_collection: 0,
        total_sales: 0,
      };
    }
  });
  return [data ?? {}, isLoading];
};

export const useGetCharData = (): [data: DueCollectedData[], isLoading: boolean] => {
  const { data, isLoading } = useQuery([DASH_COLLECTED_STATS], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<DueCollectedData[]>> = await api.get(
        "/accounting/reports/due-collected-stats",
      );
      return data.data;
    } catch (_e) {
      return [];
    }
  });
  return [data ?? [], isLoading];
};
