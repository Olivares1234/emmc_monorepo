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

import { setCustomerFilter } from "../../redux/salesSlice";
import { selectCustomerFilter } from "../../redux/selectors";

import CustomerModal from "./components/CustomerModal";
import { tableFormat } from "./constants";
import { useDeleteCustomer, useGetCustomers } from "./hooks";
import { Customers } from "./types";

function CustomersContainer() {
  const [data, isLoading, paginate] = useGetCustomers();
  const openModal = useModalContext();
  const [deleteCustomer] = useDeleteCustomer();
  const dispatch = useAppDispatch();
  const handleFilterChange = (value: AnyObject) => dispatch(setCustomerFilter(value));

  const handleAdd = () =>
    openModal({
      title: "Create customer",
      render: (close) => <CustomerModal onClose={close} />,
      size: 900,
    });

  const actionMenu: TableActionMenu[] = useMemo(
    () => [
      {
        label: "Edit",
        onClick: (data) =>
          openModal({
            title: "Edit",
            render: (close) => (
              <CustomerModal data={data as Customers} isEditMode onClose={close} />
            ),
            size: 900,
          }),
      },
      {
        label: "Delete",
        onClick: (data) =>
          confirmationDialog({
            message: "Are you sure you want to delete this customer?",
            onOk: async () => await deleteCustomer(data?.id as number),
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
          filterSelector={selectCustomerFilter}
        />
        <RoleChecker nonSuperAdmin>
          <Button onClick={handleAdd} color="teal" className="mb-4">
            Create Customer
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
export default CustomersContainer;
