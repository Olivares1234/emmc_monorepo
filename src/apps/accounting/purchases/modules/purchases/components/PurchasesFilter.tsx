import React, { useCallback, useMemo, useState } from "react";
import { Button, Flex, Select } from "@mantine/core";
import { purchaseOrderFilterDefault } from "apps/accounting/purchases/redux/constants";
import { selectPurchaseOrderFilter } from "apps/accounting/purchases/redux/selectors";
import { AdvanceFilterModalProps } from "common/components/list/types";
import { months } from "common/constants";
import { useAppSelector } from "redux/hooks";
import { removeEmpty, startCase } from "utils/helpers";

import { useGetSuplierOptions } from "../../supplier/hooks";

import { currencyOpt, sortOptions, statusOptions } from "./constants";

function PurchasesFilter({ onChange, onClose }: AdvanceFilterModalProps) {
  const currentFilter = useAppSelector(selectPurchaseOrderFilter);

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

  const [supplierOpt] = useGetSuplierOptions();

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
          data={statusOptions}
          value={filter.status}
          onChange={handleChange("status")}
          placeholder="Status"
          dropdownPosition="bottom"
        />
        <Select
          data={sortOptions}
          value={filter.sortBy}
          onChange={handleChange("sortBy")}
          placeholder="Sort By"
          dropdownPosition="bottom"
        />
        <Select
          data={supplierOpt}
          value={filter.customer}
          onChange={handleChange("supplier")}
          placeholder="Supplier"
          dropdownPosition="bottom"
          radius="sm"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
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
            className="w-full"
            radius="sm"
          />
        </div>
        <div className="flex-1">
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
            className="w-full"
            radius="sm"
          />
        </div>
        <div className="flex-1">
          <Select
            data={currencyOpt}
            value={filter.currency}
            onChange={handleChange("currency")}
            placeholder="Currency"
            dropdownPosition="bottom"
            className="w-full"
            radius="sm"
          />
        </div>
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

export default PurchasesFilter;
