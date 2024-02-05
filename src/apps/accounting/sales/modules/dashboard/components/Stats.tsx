import React from "react";
import { NumberCard } from "common/components/cards";

import { useGetDashCount } from "../hooks";

const Stats: React.FC = () => {
  const [data, isLoading] = useGetDashCount();

  const countItems = [
    {
      label: "Customers",
      colKey: "customers_count",
      color: "indigo",
    },
    {
      label: "Invoice",
      colKey: "invoice_count",
      color: "grape",
    },
    {
      label: "Total Collection",
      colKey: "total_collection",
      color: "yellow",
    },
    {
      label: "Total Sales",
      colKey: "total_sales",
      color: "cyan",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mt-4">
      {countItems.map(({ label, colKey, color }) => (
        <NumberCard
          key={colKey}
          title={label}
          value={isLoading ? "Loading..." : data[colKey]}
          paperProps={{
            bg: color,
            className: "text-white",
          }}
        />
      ))}
    </div>
  );
};

export default Stats;
