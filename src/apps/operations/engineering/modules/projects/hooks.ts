import { useParams } from "react-router-dom";
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
import { useAppSelector } from "redux/hooks";
import api from "utils/api";
import {
  removeEmpty,
  snakeCaseKeysToCamelCase,
  transformSelectOptData,
} from "utils/helpers";

import { selectProjectsFilter } from "../../redux/selectors";

import { PROJECTS, PROJECTS_INFO } from "./constants";
import { Project, Projects } from "./types";

export const useGetProjects = (
  defaultPagination: undefined | PaginateDefaultValue = undefined,
): [ApiResponse<Projects>, boolean, PaginateType] => {
  const paginate = usePaginate(defaultPagination);
  const filter = useAppSelector(selectProjectsFilter);

  const { data, isFetching, isLoading } = useQuery(
    [
      PROJECTS,
      removeEmpty({
        ...paginate.pageParams,
        ...filter,
      }),
    ],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Projects>> = await api.get(
          "/operation/v1/engg/projects",
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

export const useGetSingleProject = (): [
  Project,
  boolean,
  Omit<UseQueryResult, "data" | "isLoading">,
] => {
  const { id } = useParams();
  const { data, isLoading, ...options } = useQuery(
    [PROJECTS_INFO, id],
    async ({ queryKey }) => {
      try {
        const { data }: AxiosResponse<ApiResponse<Project>> = await api.get(
          `/operation/v1/engg/projects/${queryKey[1] as string}`,
        );
        return data.data;
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [snakeCaseKeysToCamelCase(data) as Project, isLoading, options];
};

export const useGetProjectOptions = (
  customer: string | undefined = undefined,
): [ReturnType<typeof transformSelectOptData>, boolean] => {
  const { data, isLoading } = useQuery(
    [`PROJECTS_OPTIONS/${customer}`],
    async () => {
      try {
        const { data }: AxiosResponse<ApiResponse<Projects[]>> = await api.get(
          "/engineering/projects",
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
          labelKey: "projects_no",
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

export const useCreateEditProjects = (
  id: number | null = null,
): [(payload: AnyObject) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    [PROJECTS],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = id
          ? await api.patch(`/operation/v1/engg/projects/${id}`, payload)
          : await api.post("/operation/v1/engg/projects", payload);

        openToast({
          type: "success",
          message: data?.message ?? "",
        });
        client.invalidateQueries([PROJECTS]);
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};

// export const useGetProjectsItems = (): [
//   InvoiceItem[],
//   boolean,
//   PaginateType & Record<string, any>,
// ] => {
//   const paginate = usePaginate();
//   const { id } = useParams();

//   const { data, isLoading } = useQuery(
//     [`${PROJECTS_ITEMS}/${id}`, removeEmpty(paginate.pageParams)],
//     async ({ queryKey }) => {
//       try {
//         const { data }: AxiosResponse<ApiResponse<InvoiceItem[]>> = await api.get(
//           `/engineering/projects/${id}/items`,
//           {
//             params: queryKey[1],
//           },
//         );
//         paginate.onTotalChange(data?.meta?.final_page ?? 1);
//         return data.data;
//       } catch (_e) {
//         return [];
//       }
//     },
//   );
//   return [data ?? [], isLoading, paginate];
// };

export const useDeleteProject = (): [(id: number) => Promise<any>, boolean] => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation([PROJECTS], async (id: number) => {
    try {
      const { data }: AxiosResponse<ApiResponse> = await api.delete(
        `operation/v1/engg/projects/${id}`,
      );

      openToast({
        type: "success",
        message: data?.message ?? "",
      });
      client.invalidateQueries([PROJECTS]);
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });
  return [mutateAsync, isLoading];
};
