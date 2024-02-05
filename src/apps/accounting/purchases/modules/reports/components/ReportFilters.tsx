import React, { useEffect, useMemo, useState } from "react";
import { Button, NumberInput, Paper, Select } from "@mantine/core";
import { selectSelectedPurchasesReport } from "apps/accounting/purchases/redux/selectors";
import { AnyObject } from "common/types";
import { useAppSelector } from "redux/hooks";

import { useGetSuplierOptions } from "../../supplier/hooks";
import { useGenerateReports } from "../hooks";

import { displayConversion, filterValues, monthOptions, yearOptions } from "./constants";

const ReportFilters = () => {
  const selectedReport = useAppSelector(selectSelectedPurchasesReport);
  const [downloadReport, isLoading] = useGenerateReports();
  const [supplierOpt] = useGetSuplierOptions();
  const [filter, setFilter] = useState<AnyObject>(filterValues[selectedReport]);

  const handleGenerateReport = async () => {
    await downloadReport({
      code: selectedReport,
      ...filter,
    });
  };

  const handleChange = (name: string) => (val: any) => {
    setFilter((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const supplier = useMemo(() => {
    if (!displayConversion.includes(selectedReport)) return null;
    return (
      <div className="reports-filter-item">
        <label className="reports-filter-label">Select Supplier:</label>
        <Select
          value={filter?.customer}
          className="rounded-full border-green-500"
          onChange={handleChange("supplier")}
          data={supplierOpt}
        />
      </div>
    );
  }, [selectedReport, filter.supplier]);

  const month = useMemo(() => {
    return (
      <div className="reports-filter-item">
        <label className="reports-filter-label">Month:</label>
        <Select
          className="rounded-full border-green-500"
          data={monthOptions}
          value={filter?.month}
          onChange={handleChange("month")}
          defaultValue="all"
        />
      </div>
    );
  }, [selectedReport, filter.month]);

  const year = useMemo(() => {
    return (
      <div className="reports-filter-item">
        <label className="reports-filter-label">Year:</label>
        <Select
          className="rounded-full border-green-500"
          data={yearOptions}
          value={filter.year}
          onChange={handleChange("year")}
          defaultValue="all"
        />
      </div>
    );
  }, [selectedReport, filter.year]);

  const conversion = useMemo(() => {
    if (!displayConversion.includes(selectedReport)) return null;
    return (
      <div className="reports-filter-item">
        <label className="reports-filter-label">Conversion:</label>
        <NumberInput
          className="rounded-full border-green-500"
          min={0}
          max={100}
          value={filter?.conversion}
          onChange={handleChange("conversion")}
          defaultValue={0}
        />
      </div>
    );
  }, [selectedReport, filter.conversion]);

  const disabledSubmit = useMemo(
    () => Object.values(filter).some((v) => !v || v === ""),
    [filter],
  );

  useEffect(() => {
    setFilter(filterValues[selectedReport]);
  }, [selectedReport]);

  return (
    <div className="flex w-full">
      <Paper withBorder className="flex-1 ml-8 p-4">
        <Paper className="grid grid-cols-2 gap-x-4 gap-y-2">
          {supplier}
          {month}
          {year}
          {conversion}
        </Paper>
      </Paper>
      <div className="w-32 ml-8 flex flex-col space-y-4">
        <Button
          fullWidth
          color="teal"
          onClick={handleGenerateReport}
          disabled={disabledSubmit || isLoading}
        >
          Generate
        </Button>
        <Button
          onClick={() => setFilter(filterValues[selectedReport])}
          color="teal"
          variant="outline"
          fullWidth
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ReportFilters;
