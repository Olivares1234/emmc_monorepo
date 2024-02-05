import { useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { Button, Flex, Paper, Title } from "@mantine/core";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import { List } from "common/components/list";
import ListSearchFilter from "common/components/list/ListSearchFilter";
import { useModalContext } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { NoData } from "common/no-data";
import { useAppDispatch } from "redux/hooks";
import { AnyObject } from "yup";

import { setPaymentsFilter } from "../../redux/purchasesSlice";
import { selectPaymentsFilter } from "../../redux/selectors";

import InvoiceFilter from "./components/PaymentsFilter";
import PaymentsModal from "./components/PaymentsModal";
import { useGetPayments } from "./hooks";
import SelectedPayments from "./SelectedPayments";
import { Payments } from "./types";

function PaymentsContainer() {
  const openModal = useModalContext();
  const [{ data, meta }, isLoading, pagination] = useGetPayments();
  const dispatch = useAppDispatch();

  const handleFilterChange = (value: AnyObject) => dispatch(setPaymentsFilter(value));

  const handleAddOR = () =>
    openModal({
      title: "Add Collection",
      render: (close) => <PaymentsModal onClose={close} />,
    });

  const renderItem = useCallback(
    (d: Payments) => (
      <div className="flex items-center justify-between py-1.5">
        <div>{d?.official_receipt_no}</div>
      </div>
    ),
    [],
  );

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <Title size="h3">Payments ({meta?.total})</Title>
      <Flex className="flex-grow" columnGap={24}>
        <Flex
          direction="column"
          className="flex-grow max-w-xs min-w-max"
          w="100%"
          rowGap={5}
        >
          <RoleChecker nonSuperAdmin>
            <Flex columnGap={6}>
              <Button className="flex-1" color="teal" onClick={handleAddOR}>
                Add Payments
              </Button>
            </Flex>
          </RoleChecker>
          <ListSearchFilter
            advanceFilterElement={InvoiceFilter}
            onChange={handleFilterChange}
            filterSelector={selectPaymentsFilter}
          />
          <List
            data={data}
            dataKey="id"
            item={renderItem}
            isLoading={isLoading}
            pagination={pagination}
          />
        </Flex>
        <Flex direction="column" className="flex-grow">
          <Routes>
            <Route
              index
              element={
                <Paper className="flex-grow flex items-center">
                  <NoData message="No selected Purchase Order" />
                </Paper>
              }
            />
            <Route path="/:id" element={<SelectedPayments />} />
          </Routes>
        </Flex>
      </Flex>
    </ContainerWrapper>
  );
}

export default PaymentsContainer;
