import { useMemo } from "react";
import { Flex } from "@mantine/core";
import { ModalButtons } from "common/components/modal";
import { Table } from "common/components/table";
import { AccountingEntry, FormModal } from "common/types";

import { entryTableFormat } from "./constants";
import { LedgerEntries } from "./types";

function AccountingEntryDisplay({ onClose, data }: FormModal) {
  const entries = data as LedgerEntries;

  const formattedEntries = useMemo<LedgerEntries>(
    () =>
      entries.map((ent) => {
        if (ent.type === AccountingEntry.Credit) {
          ent.credit = ent.amount;
        } else ent.debit = ent.amount;
        return ent;
      }),
    [entries],
  );

  return (
    <Flex direction="column">
      <Flex className="flex-grow" direction="column">
        <Flex direction="column" py={7} className="flex-grow" mt={16} mih={300}>
          <Table
            showTotal={{
              columnKeys: ["debit", "credit"],
              precision: 4,
            }}
            data={formattedEntries}
            format={entryTableFormat}
            customRowClass={(val) => {
              if (val.type === AccountingEntry.Credit) return "bg-sky-900 text-gray-200";
              return "bg-sky-600  text-gray-200";
            }}
          />
        </Flex>
      </Flex>
      <ModalButtons okType="button" okLabel="Close" onOk={onClose} hideCancel />
    </Flex>
  );
}

export default AccountingEntryDisplay;
