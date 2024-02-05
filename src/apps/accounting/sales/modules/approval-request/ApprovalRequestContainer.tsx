import { useMemo } from "react";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import ListSearchFilter from "common/components/list/ListSearchFilter";
import { useModalContext } from "common/components/modal";
import { Table } from "common/components/table";
import { TableActionMenu } from "common/components/table/types";
import { AnyObject } from "common/types";
import { useAppDispatch } from "redux/hooks";

import { setCustomerFilter } from "../../redux/salesSlice";
import { selectCustomerFilter } from "../../redux/selectors";

import ApprovalModal from "./components/ApprovalModal";
import { tableFormat } from "./constants";
import { useGetApproval } from "./hooks";
import { Approval } from "./types";
// import { useDeleteCustomer, useGetCustomers } from "./hooks";

function ApprovalRequestContainer() {
  const [data, isLoading, paginate] = useGetApproval();
  const openModal = useModalContext();
  const dispatch = useAppDispatch();
  const handleFilterChange = (value: AnyObject) => dispatch(setCustomerFilter(value));

  const actionMenu: TableActionMenu[] = useMemo(
    () => [
      {
        label: "View",
        onClick: (data) =>
          openModal({
            title: "Changes",
            render: (close) => (
              <ApprovalModal data={data as Approval} isEditMode onClose={close} />
            ),
            size: "lg",
          }),
      },
      // {
      //   label: "Delete",
      //   onClick: (data) =>
      //     confirmationDialog({
      //       message: "Are you sure you want to delete this customer?",
      //       onOk: async () => await deleteCustomer(data?.id as number),
      //     }),
      // },
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
export default ApprovalRequestContainer;
