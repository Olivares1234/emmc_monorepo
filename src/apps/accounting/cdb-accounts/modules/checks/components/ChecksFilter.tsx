import React, { useCallback, useMemo, useState } from "react";
import { Button, Flex, Select } from "@mantine/core";
import { selectCdbVoucherFilter } from "apps/accounting/cdb-accounts/redux/selectors";
import { purchaseOrderFilterDefault } from "apps/accounting/purchases/redux/constants";
import { AdvanceFilterModalProps } from "common/components/list/types";
import { useAppSelector } from "redux/hooks";
import { removeEmpty, startCase } from "utils/helpers";

import { sortOptions } from "./constants";

function ChecksFilter({ onChange, onClose }: AdvanceFilterModalProps) {
  const currentFilter = useAppSelector(selectCdbVoucherFilter);

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
    setFilter(purchaseOrderFilterDefault);
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
          data={sortOptions}
          value={filter.sortBy}
          onChange={handleChange("sortBy")}
          placeholder="Sort By"
          dropdownPosition="bottom"
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

export default ChecksFilter;
