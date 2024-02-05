import { useCallback } from "react";
import { useModalContext } from "common/components/modal";

import AccountingEntryDisplay from "./AccountingEntryDisplay";
import { ENTRY_MODAL_TITLE } from "./constants";
import { LedgerEntries } from "./types";

export const useDisplayEntryModal = () => {
  const modal = useModalContext();

  const displayModal = useCallback((data: LedgerEntries, delay: number = 1000) => {
    if (data?.length > 0) {
      setTimeout(
        () =>
          modal({
            title: ENTRY_MODAL_TITLE,
            render: (close) => <AccountingEntryDisplay onClose={close} data={data} />,
            size: "xl",
          }),
        delay,
      );
    }
  }, []);

  return displayModal;
};
