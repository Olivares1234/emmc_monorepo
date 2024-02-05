import React, { useEffect, useMemo, useState } from "react";
import { Button, NumberInput, Paper, Select } from "@mantine/core";
import { selectedSelectedReports } from "apps/accounting/sales/redux/selectors";
import { AnyObject } from "common/types";
import { useAppSelector } from "redux/hooks";

import { useGetCustomerOptions } from "../../customers/hooks";
import { useGenerateReports } from "../hooks";

import {
  currencyOptions,
  displayConversion,
  displayMonth,
  displayYear,
  filterValues,
  monthOptions,
  weekOptions,
  yearOptions,
} from "./constants";

const ReportFilters = () => {
  const selectedReport = useAppSelector(selectedSelectedReports);
  const [filter, setFilter] = useState<AnyObject>(filterValues[selectedReport]);
  const [customers, loadingCustomer] = useGetCustomerOptions();
  const [downloadReport, isLoading] = useGenerateReports();

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

  const customer = useMemo(() => {
    if (selectedReport !== "SOA") return null;
    return (
      <div className="reports-filter-item">
        <label className="reports-filter-label">Select Customer:</label>
        <Select
          value={filter?.customer}
          className="rounded-full border-green-500"
          onChange={handleChange("customer")}
          placeholder={loadingCustomer ? "Loading customer..." : "Customer"}
          data={customers}
        />
      </div>
    );
  }, [selectedReport, filter.customer, loadingCustomer, customers]);

  const month = useMemo(() => {
    if (!displayMonth.includes(selectedReport)) return null;
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
    if (!displayYear.includes(selectedReport)) return null;
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

  const currency = useMemo(() => {
    if (selectedReport !== "SOA") return null;
    return (
      <div className="reports-filter-item">
        <label className="reports-filter-label">Currency:</label>
        <Select
          className="rounded-full border-green-500 w-full md:w-50"
          data={currencyOptions}
          value={filter?.currency}
          onChange={handleChange("currency")}
          defaultValue="all"
        />
      </div>
    );
  }, [selectedReport, filter.currency]);

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
          precision={5}
        />
      </div>
    );
  }, [selectedReport, filter.conversion]);

  const week = useMemo(() => {
    if (selectedReport !== "WAR") return null;
    return (
      <div className="reports-filter-item">
        <label className="reports-filter-label">Week:</label>
        <Select
          className="rounded-full border-green-500"
          data={weekOptions}
          defaultValue="all"
          value={filter.week}
          onChange={handleChange("week")}
        />
      </div>
    );
  }, [selectedReport, filter.week]);

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
        <Paper className="grid grid-cols-2 gap-4">
          {customer}
          {month}
          {year}
          {currency}
          {conversion}
          {week}
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
          disabled={isLoading}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ReportFilters;
