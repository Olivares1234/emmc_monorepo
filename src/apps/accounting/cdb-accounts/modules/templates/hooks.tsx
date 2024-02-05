import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "common/components/toast";
import { SELECT_OPTIONS_CONFIG } from "common/constants";
import { AnyObject, ApiResponse } from "common/types";
import { PaginateType, usePaginate } from "hooks/usePaginate";
import api from "utils/api";
import { snakeCaseKeysToCamelCase, transformSelectOptData } from "utils/helpers";

import { TEMPLATE_OPTIONS, TEMPLATES } from "./constants";
import { Template } from "./types";

export const useGetTemplates = (): [Template[], boolean, PaginateType] => {
  const paginate = usePaginate();
  const { data, isLoading } = useQuery(
    [TEMPLATES, paginate.pageParams],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Template[]>> = await api.get(
          "/accounting/v1/cdb/templates",
          {
            params: queryKey[1],
          },
        );
        paginate.onTotalChange(data?.meta?.final_page ?? 1);
        return snakeCaseKeysToCamelCase(data.data);
      } catch (_e) {
        return [];
      }
    },
  );
  return [data ?? [], isLoading, paginate];
};

export const useGetSingleTemplate = (id: number): [Template, boolean] => {
  const { data, isFetching } = useQuery(
    [`${TEMPLATES}/${id}`],
    async () => {
      try {
        const { data }: AxiosResponse<ApiResponse<Template>> = await api.get(
          `/accounting/v1/cdb/templates/${id}`,
        );
        return snakeCaseKeysToCamelCase(data.data);
      } catch (_e) {
        return [];
      }
    },
    {
      enabled: !!id,
    },
  );
  return [data as Template, isFetching];
};

export const useGetTemplateOptions = (): [
  ReturnType<typeof transformSelectOptData>,
  boolean,
] => {
  const { data, isLoading } = useQuery([TEMPLATE_OPTIONS], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<Template[]>> = await api.get(
        "/accounting/v1/cdb/templates",
        SELECT_OPTIONS_CONFIG,
      );
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

export const useCreateEditTemplate = (
  id: number | null = null,
): [(payload: Template) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    [TEMPLATES],
    async (payload: Template) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = id
          ? await api.patch(
              `/accounting/v1/cdb/templates/${payload?.id as number}`,
              payload,
            )
          : await api.post("/accounting/v1/cdb/templates", payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries([TEMPLATES]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

export const useDeleteTemplate = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation([TEMPLATES], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `/accounting/v1/cdb/templates/${id}`,
      );

      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries([TEMPLATES]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};
