import { useMemo } from "react";
import { Button } from "@mantine/core";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import ListSearchFilter from "common/components/list/ListSearchFilter";
import { confirmationDialog, useModalContext } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { Table } from "common/components/table";
import { TableActionMenu } from "common/components/table/types";
import { useAppDispatch } from "redux/hooks";
import { AnyObject } from "yup";

import { setAccountsFilter } from "../../redux/purchasesSlice";

import AccountsModal from "./components/AccountsModal";
import { tableFormat } from "./constants";
import { useDeleteAccounts, useGetAccounts } from "./hooks";
import { Accounts } from "./type";

function AccountsContainer() {
  const [data, isLoading, paginate] = useGetAccounts();
  const openModal = useModalContext();
  const [deleteAccounts] = useDeleteAccounts();
  const dispatch = useAppDispatch();
  const handleFilterChange = (value: AnyObject) => dispatch(setAccountsFilter(value));

  const handleAdd = () =>
    openModal({
      title: "Create Account",
      render: (close) => <AccountsModal onClose={close} />,
      size: 500,
    });

  const actionMenu: TableActionMenu[] = useMemo(
    () => [
      {
        label: "Edit",
        onClick: (data) =>
          openModal({
            title: "Edit Account",
            render: (close) => (
              <AccountsModal data={data as Accounts} isEditMode onClose={close} />
            ),
            size: 500,
          }),
      },
      {
        label: "Delete",
        onClick: (data) =>
          confirmationDialog({
            message: "Are you sure you want to delete this account?",
            onOk: async () => await deleteAccounts(data?.id as number),
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
          filterSelector={setAccountsFilter}
        />
        <RoleChecker nonSuperAdmin>
          <Button onClick={handleAdd} color="teal" className="mb-4">
            Create Account
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
export default AccountsContainer;
