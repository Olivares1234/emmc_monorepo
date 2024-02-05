import { Table } from "common/components/table";

import { invoiceTableFormat } from "./constants";

function SalesTable() {
  return (
    <div className="flex flex-grow w-3/4">
      <Table format={invoiceTableFormat} data={[]} />
    </div>
  );
}

export default SalesTable;
