import { useEffect, useRef } from "react";
import { NavLink, useNavigate, useResolvedPath } from "react-router-dom";
import { clsx, Flex, LoadingOverlay, Pagination, Paper, Select } from "@mantine/core";
import { AnyObject } from "common/types";
import get from "lodash.get";
import { useAppSelector } from "redux/hooks";

import { selectScheme } from "../layout/redux/selectors";

import { ListProps } from "./types";

function ListContainer<T = AnyObject>({
  data,
  isLoading,
  dataKey,
  item,
  emptyMessage,
  pagination = undefined,
}: ListProps<T>) {
  const scheme = useAppSelector(selectScheme);
  const url = useResolvedPath("").pathname;
  const limit = useRef<number>(pagination?.limit as number);
  const redirect = useRef<boolean>(true);

  const nav = useNavigate();

  useEffect(() => {
    if (data?.length > 0 && !isLoading && redirect?.current)
      nav(`${url}/${data[0].id as string}`);

    if (data?.length < 1 && !isLoading) nav(url);
  }, [isLoading, data]);

  useEffect(() => {
    if (limit?.current !== pagination?.limit) {
      limit.current = pagination?.limit as number;
      redirect.current = false;
    }
  }, [pagination?.limit]);

  useEffect(() => {
    redirect.current = true;
  }, [pagination?.paginationProps?.value]);

  return (
    <Paper
      shadow="md"
      withBorder
      className={clsx("flex flex-col relative flex-grow list")}
    >
      <Flex direction="column" className="relative flex-grow mb-2">
        <Flex direction="column" className="scroll-trap">
          {!isLoading &&
            data?.map((d) => (
              <NavLink
                key={get(d, dataKey)}
                to={`${url}/${get(d, dataKey) as string}`}
                className={clsx(
                  "list-items relative",
                  scheme === "dark" ? "dark" : "light",
                )}
              >
                {item ? item(d as unknown as T) : "-"}
              </NavLink>
            ))}
          {!isLoading && data?.length < 1 && (
            <div
              className={clsx("text-center flex-grow flex justify-center items-center ")}
            >
              {emptyMessage ?? <p className="font-medium text-lg">NO DATA</p>}
            </div>
          )}
        </Flex>
      </Flex>
      {pagination && (
        <Flex align="center" justify="space-between" h={48} columnGap={2} px={12}>
          {(pagination?.paginationProps?.value > 1 || data?.length > 0) && (
            <Select
              value={String(pagination.limit)}
              onChange={(val) => pagination.onChangeLimit(Number(val))}
              data={[
                {
                  value: "10",
                  label: "10",
                },
                {
                  value: "25",
                  label: "25",
                },
                {
                  value: "50",
                  label: "50",
                },
                {
                  value: "100",
                  label: "100",
                },
              ]}
              size="xs"
              className="w-16"
            />
          )}
          {data?.length > 0 && (
            <Pagination
              disabled={isLoading}
              position="center"
              my={12}
              color="teal"
              className="w-100"
              size="xs"
              {...pagination.paginationProps}
            />
          )}
        </Flex>
      )}
      <LoadingOverlay
        loaderProps={{
          color: "teal",
        }}
        overlayOpacity={0}
        visible={isLoading ?? false}
      />
    </Paper>
  );
}

export default ListContainer;
