import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "common/components/toast";
import { ApiResponse } from "common/types";
import api from "utils/api";
import { AnyObject } from "yup";

import { SYNC_TRANSACTION_NO_ACC } from "./constants";

export const useSyncTxNumber = (): [UseMutateAsyncFunction, boolean] => {
  const { mutateAsync, isLoading } = useMutation([SYNC_TRANSACTION_NO_ACC], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.post(
        "/accounting/v1/utils/sync-tx-no",
      );
      openToast({
        type: "success",
        message: data?.message ?? "",
      });
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};
