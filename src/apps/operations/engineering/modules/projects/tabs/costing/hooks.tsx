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
import api from "utils/api";
import { removeEmpty, snakeCaseKeysToCamelCase } from "utils/helpers";

import { CostingDetails, RscValues } from "./modals/types";
// import { selectProjectsFilter } from "../../redux/selectors";
import { COSTING_INFO, COSTING_LIST } from "./constants";

export const useGetCostings = (
  defaultPagination: undefined | PaginateDefaultValue = undefined,
): [ApiResponse<RscValues[]>, boolean, PaginateType] => {
  const paginate = usePaginate(defaultPagination);
  // const filter = useAppSelector(selectProjectsFilter);

  const { data, isFetching, isLoading } = useQuery(
    [
      COSTING_LIST,
      removeEmpty({
        ...paginate.pageParams,
        // ...filter,
      }),
    ],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<RscValues[]>> = await api.get(
          "/operation/v1/engg/costing",
          {
            params: queryKey[1],
          },
        );
        paginate.onTotalChange(data?.meta?.final_page ?? 1);

        return {
          ...data,
          data: snakeCaseKeysToCamelCase(data.data),
        };
      } catch (_e) {
        return [];
      }
    },
  );
  return [data ?? DEFAULT_RESPONSE_LIST, isFetching || isLoading, paginate];
};

export const useGetSingleCosting = (
  id: number | null,
): [
  CostingDetails,
  boolean,
  Omit<UseQueryResult, "data" | "isLoading" | "isFetching">,
] => {
  const { data, isLoading, isFetching, ...options } = useQuery(
    [COSTING_INFO, id],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<CostingDetails>> = await api.get(
          `/operation/v1/engg/costing/${queryKey[1] as string}`,
        );
        return data.data;
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
    {
      enabled: !!id,
    },
  );
  return [
    snakeCaseKeysToCamelCase(data) as CostingDetails,
    isLoading || isFetching,
    options,
  ];
};

export const useCreateEditCosting = (
  id: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    [COSTING_LIST],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = id
          ? await api.patch(`/operation/v1/engg/costing/${id}`, payload)
          : await api.post("/operation/v1/engg/costing", payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries([COSTING_LIST]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useDeleteCosting = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation([COSTING_LIST], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `operation/v1/engg/costing/${id}`,
      );

      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries([COSTING_LIST]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};
