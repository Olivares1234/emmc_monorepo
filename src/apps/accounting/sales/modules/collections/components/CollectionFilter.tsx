import React, { useCallback, useMemo, useState } from "react";
import { Button, Flex, Select } from "@mantine/core";
import { collectionFilterDefault } from "apps/accounting/sales/redux/constants";
import { selectCollectionFilter } from "apps/accounting/sales/redux/selectors";
import { AdvanceFilterModalProps } from "common/components/list/types";
import { months } from "common/constants";
import { useAppSelector } from "redux/hooks";
import { removeEmpty, startCase } from "utils/helpers";

import { paymentMethodOpt } from "./constants";

function CollectionFilter({ onChange, onClose }: AdvanceFilterModalProps) {
  const currentFilter = useAppSelector(selectCollectionFilter);

  const [filter, setFilter] = useState(currentFilter);
  const filteredFilter = useMemo(() => removeEmpty(filter), [filter]);

  const handleChange = (name: string) => (value: string | null) =>
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));

  const handleFilter = useCallback(() => {
    onChange(filter);
    onClose();
  }, [filter, filteredFilter]);

  const handleReset = useCallback(() => {
    setFilter(collectionFilterDefault);
  }, []);

  return (
    <Flex direction="column" gap="x1" className="p-4 space-y-6">
      {Object.keys(filteredFilter).length > 0 && (
        <div>
          <strong>Applied Filters:</strong>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
            {Object.keys(filteredFilter).map((f) => (
              <div
                key={f}
                className="text-white bg-forest-600 px-2 py-1 rounded-md text-sm uppercase font-bold"
              >
                {startCase(f)}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-2">
        <Select
          data={paymentMethodOpt}
          value={filter.payment}
          onChange={handleChange("payment")}
          placeholder="Payment Method"
          dropdownPosition="bottom"
          radius="sm"
        />
        <Select
          data={[
            { value: "all", label: "All" },
            ...months.map((month, index) => ({
              value: (index + 1).toString(),
              label: month,
            })),
          ]}
          value={filter.month}
          onChange={handleChange("month")}
          placeholder="Select Month"
          dropdownPosition="bottom"
          radius="sm"
        />
        <Select
          data={[
            { value: "all", label: "All" },
            ...Array.from({ length: 10 }, (_, index) => {
              const year = new Date().getFullYear() - index;
              return { value: year.toString(), label: year.toString() };
            }),
          ]}
          value={filter.year}
          onChange={handleChange("year")}
          placeholder="Select Year"
          dropdownPosition="bottom"
          radius="sm"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleFilter} color="teal" className="w-full">
          Apply
        </Button>
        <Button onClick={handleReset} variant="outline" color="teal" className="w-full">
          Reset
        </Button>
      </div>
    </Flex>
  );
}

export default CollectionFilter;
