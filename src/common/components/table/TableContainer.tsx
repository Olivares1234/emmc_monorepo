import { Children } from "react";
import { FaEllipsisH } from "react-icons/fa";
import {
  clsx,
  Flex,
  LoadingOverlay,
  Menu,
  Pagination,
  Select,
  Table,
  Tooltip,
} from "@mantine/core";
import { AnyObject } from "common/types";
import dayjs from "dayjs";
import get from "lodash.get";
import debounce from "lodash/debounce";
import { useAppSelector } from "redux/hooks";

import { selectScheme } from "../layout/redux/selectors";

import { TableFormatTypes, TableType } from "./types";

function TableContainer<T = AnyObject>({
  data,
  tableProps = {
    withBorder: true,
  },
  isLoading = false,
  format,
  key = "id",
  actionMenu = [],
  emptyMessage,
  pagination = undefined,
  showTotal = undefined,
  footer = undefined,
  noScroll = false,
  customRowClass = undefined,
}: TableType<T>) {
  const scheme = useAppSelector(selectScheme);

  return (
    <div className="flex flex-col flex-grow relative">
      <div
        className={clsx(
          !noScroll &&
            "absolute top-0 left-0 right-0 bottom-0 flex flex-col overflow-auto scroll-trap",
        )}
      >
        <Table withColumnBorders {...tableProps}>
          <thead
            className={clsx("top-0 sticky", scheme === "dark" ? "dark-bg" : "light-bg")}
            style={{
              zIndex: 1,
            }}
          >
            <tr>
              {Children.toArray(
                format?.map((f) => {
                  return <th className="whitespace-nowrap">{f?.label ?? ""}</th>;
                }),
              )}
              {actionMenu && actionMenu.length > 0 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              !isLoading &&
              Children.toArray(
                data.map((dt, i) => {
                  let customClass = "";
                  if (customRowClass) {
                    customClass = customRowClass(dt, i);
                  }

                  return (
                    <tr className={customClass} key={(dt as AnyObject)?.[key]}>
                      {Children.toArray(
                        format?.map((f) => {
                          const val = (() => {
                            const v =
                              (get(dt, f.colKey, f.defaultValue ?? "") as string) ?? "";

                            try {
                              if (f.formatAs) {
                                if (f.formatAs.type === TableFormatTypes.DATE) {
                                  return v
                                    ? dayjs(v).format(f.formatAs.format as string)
                                    : "";
                                } else if (f.formatAs.type === TableFormatTypes.NUMBER) {
                                  return Number(v) > -1
                                    ? Number(v).toFixed(f.formatAs.format as number)
                                    : "";
                                }
                              }

                              return v;
                            } catch (_e) {
                              return v;
                            }
                          })();
                          if (f.customRender)
                            return (
                              <td
                                className={`${f.className}`}
                                style={{
                                  width: f?.width,
                                }}
                              >
                                {f?.customRender(dt, i)}
                              </td>
                            );

                          return (
                            <td
                              className={`${f.className}`}
                              style={{
                                width: f?.width,
                                maxWidth: f?.maxWidth ?? 300,
                              }}
                            >
                              {f?.withTooltip ? (
                                <Tooltip withArrow multiline width={300} label={val}>
                                  <div className="truncate">{val}</div>
                                </Tooltip>
                              ) : (
                                <div className="truncate ">{val}</div>
                              )}
                            </td>
                          );
                        }),
                      )}
                      {actionMenu && actionMenu.length > 0 && (
                        <td width={50}>
                          <Menu position="bottom-end" shadow="md">
                            <Menu.Target>
                              <span className="block text-center w-16 hover:cursor-pointer">
                                <FaEllipsisH />
                              </span>
                            </Menu.Target>
                            <Menu.Dropdown>
                              {Children.toArray(
                                actionMenu
                                  .filter((a, i) => (a?.hidden ? !a.hidden(dt, i) : true))
                                  .map((a, i) => (
                                    <Menu.Item
                                      onClick={debounce(() => a.onClick(dt, i), 150)}
                                      p="xs"
                                      className="text-right"
                                      disabled={a?.disabled ? a?.disabled(dt, i) : false}
                                    >
                                      {a.label}
                                    </Menu.Item>
                                  )),
                              )}
                            </Menu.Dropdown>
                          </Menu>
                        </td>
                      )}
                    </tr>
                  );
                }),
              )}
            {showTotal &&
              showTotal?.columnKeys?.length > 0 &&
              !isLoading &&
              data?.length > 0 && (
                <tr>
                  {Children.toArray(
                    format?.map((f) => {
                      const val = (() => {
                        if (showTotal.columnKeys.includes(f.colKey)) {
                          return data
                            .reduce((prev, curr) => {
                              const v = get(curr, f.colKey, f.defaultValue ?? "");
                              if (isNaN(+v)) return prev;
                              return +v + prev;
                            }, 0)
                            ?.toFixed(showTotal?.precision ?? 5);
                        }

                        // return (get(dt, f.colKey, f.defaultValue ?? "") as string) ?? "";
                        return "";
                      })();

                      return (
                        <td
                          className={`${f.className} `}
                          style={{
                            width: f?.width,
                            maxWidth: f?.maxWidth ?? 300,
                          }}
                        >
                          {f?.withTooltip ? (
                            <Tooltip withArrow multiline width={300} label={val}>
                              <div className="truncate">{val}</div>
                            </Tooltip>
                          ) : (
                            <div className="truncate ">{val}</div>
                          )}
                        </td>
                      );
                    }),
                  )}
                </tr>
              )}

            {footer && footer?.length > 0 && !isLoading && data?.length > 0 && (
              <tr>
                {Children.toArray(
                  format?.map((f, i) => {
                    const val = (() => {
                      const footerVal = footer.find((f) => f.index === i);
                      if (!footerVal) return "";
                      return footerVal.element;
                    })();

                    return (
                      <td
                        className={`${f.className} `}
                        style={{
                          width: f?.width,
                          maxWidth: f?.maxWidth ?? 300,
                        }}
                      >
                        <div className="truncate ">{val}</div>
                      </td>
                    );
                  }),
                )}
              </tr>
            )}
          </tbody>
        </Table>
        {data?.length < 1 && !isLoading && (
          <div
            className={clsx(
              "flex-grow flex items-center justify-center",
              scheme === "dark" ? "dark-border" : "light-border",
            )}
          >
            {emptyMessage ?? <p className="font-medium text-lg">NO DATA</p>}
          </div>
        )}
        {pagination && (
          <Flex align="center" justify="space-between" className="mt-2">
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
            <Pagination
              disabled={isLoading}
              position="center"
              my={12}
              color="teal"
              size="sm"
              {...pagination.paginationProps}
            />
          </Flex>
        )}
      </div>

      <LoadingOverlay
        loaderProps={{
          color: "teal",
        }}
        overlayOpacity={0}
        visible={isLoading ?? false}
      />
    </div>
  );
}

export default TableContainer;
