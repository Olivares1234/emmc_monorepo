import { useMemo } from "react";
import { Button } from "@mantine/core";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import ListSearchFilter from "common/components/list/ListSearchFilter";
import { confirmationDialog, useModalContext } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { Table } from "common/components/table";
import { TableActionMenu } from "common/components/table/types";
import { AnyObject } from "common/types";
import { useAppDispatch } from "redux/hooks";

import { setJournalFilter } from "../../redux/ledgerSlice";
import { selectJournalFilter } from "../../redux/selectors";

import JournalModals from "./modals/JournalModal";
import { tableFormat } from "./constants";
import { useDeleteJournal, useGetJournals } from "./hooks";
import { Journal } from "./types";

function JournalsContainer() {
  const [data, isLoading, paginate] = useGetJournals();
  const openModal = useModalContext();
  const [deleteJournal] = useDeleteJournal();
  const dispatch = useAppDispatch();
  const handleFilterChange = (value: AnyObject) => dispatch(setJournalFilter(value));

  const handleAdd = () =>
    openModal({
      title: "Add Entry",
      render: (close) => <JournalModals onClose={close} />,
      size: 900,
    });

  const actionMenu: TableActionMenu[] = useMemo(
    () => [
      {
        label: "Edit",
        disabled: () => true,
        onClick: (data) =>
          openModal({
            title: "Edit",
            render: (close) => (
              <JournalModals data={data as Journal} isEditMode onClose={close} />
            ),
            size: 900,
          }),
      },
      {
        label: "Delete",
        disabled: () => true,
        onClick: (data) =>
          confirmationDialog({
            message: "Are you sure you want to delete this journal?",
            onOk: async () => await deleteJournal(data?.id as number),
          }),
      },
    ],
    [],
  );

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <div className="flex items-center justify-between mb-4">
        <ListSearchFilter
          showInputOnly
          onChange={handleFilterChange}
          filterSelector={selectJournalFilter}
        />
        <RoleChecker nonSuperAdmin>
          <Button onClick={handleAdd} color="teal" className="mb-4">
            Add Entry
          </Button>
        </RoleChecker>
      </div>
      <Table
        format={tableFormat}
        data={data}
        isLoading={isLoading}
        actionMenu={actionMenu}
        pagination={paginate}
      />
    </ContainerWrapper>
  );
}
export default JournalsContainer;
