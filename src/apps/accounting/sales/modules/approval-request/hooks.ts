import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "common/components/toast";
import { AnyObject, ApiResponse } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import { useAppSelector } from "redux/hooks";
import api from "utils/api";
import { removeEmpty } from "utils/helpers";

import { selectCustomerFilter } from "../../redux/selectors";

import { APPROVAL } from "./constants";
import { Approval } from "./types";

export const useGetApproval = (): [Approval[], boolean, PaginateType] => {
  const paginate = usePaginate();
  const filter = useAppSelector(selectCustomerFilter);
  const { data, isLoading } = useQuery(
    [
      APPROVAL,
      removeEmpty({
        ...paginate.pageParams,
        ...filter,
      }),
    ],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Approval[]>> = await api.get(
          "/accounting/v1/approval-request/sales",
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

export const useApproveRequest = (): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    [APPROVAL],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = await api.patch(
          `/accounting/v1/sales/approval-request/${payload?.id as number}`,
          payload,
        );

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries([APPROVAL]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};
