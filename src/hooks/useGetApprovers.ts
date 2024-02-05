import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "apps/portal/auth/types";
import { AxiosResponse } from "axios";
import { ApiResponse } from "common/types";
import api from "utils/api";
import { transformSelectOptData } from "utils/helpers";

export const useGetApprovers = (): [
  ReturnType<typeof transformSelectOptData>,
  boolean,
] => {
  const { data, isLoading } = useQuery([`ORG_APPROVERS`], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<UserProfile[]>> = await api.get(
        "/auth/users/approvers/org",
      );
      return transformSelectOptData(data?.data, {
        valueKey: "email",
        labelKey: "email",
      });
    } catch (_e) {
      return [];
    }
  });
  return [data ?? [], isLoading];
};
