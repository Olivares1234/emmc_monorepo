import { Children } from "react";
import { Table, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useGetColorScheme } from "hooks/useGetColorScheme";
import get from "lodash.get";

import { DescriptionProps } from "./types";

function DescriptionContainer({ data, format, columns }: DescriptionProps) {
  const scheme = useGetColorScheme();

  const formattedData = Array.from(
    { length: Math.ceil(format?.length / columns) },
    (_, index) => format.slice(index * columns, (index + 1) * columns),
  );

  return (
    <Table withColumnBorders withBorder>
      <tbody>
        {Children.toArray(
          formattedData?.map((d) => {
            if (d?.length < 1) return <tr />;

            return (
              <tr className={scheme === "dark" ? "dark-border" : "light-border"}>
                {Children.toArray(
                  d?.map((val) => (
                    <>
                      <td>
                        <Text weight={500}>{val?.label}</Text>
                      </td>
                      <td>
                        <Text>
                          {val?.customRender ? (
                            val?.customRender()
                          ) : (
                            <>
                              {val.formatAsDate
                                ? dayjs(get(data, val.key)).format(val.formatAsDate)
                                : get(data, val.key)}
                            </>
                          )}
                        </Text>
                      </td>
                    </>
                  )),
                )}
              </tr>
            );
          }),
        )}
      </tbody>
    </Table>
  );
}

export default DescriptionContainer;
