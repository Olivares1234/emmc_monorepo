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
import { AnyObject } from "common/types";
import { useAppDispatch } from "redux/hooks";

import { setPurchasesOrderFilter } from "../../redux/purchasesSlice";
import { selectPurchaseOrderFilter } from "../../redux/selectors";
import PaymentsModal from "../payments/components/PaymentsModal";

import PurchasesFilter from "./components/PurchasesFilter";
import PurchasesModal from "./components/PurchasesModal";
import PurchasesStatus from "./components/PurchasesStatus";
import { useGetPurchases } from "./hooks";
import SelectedPurchases from "./SelectedPurchases";
import { Purchases } from "./types";

function PurchasesItemContainer() {
  const openModal = useModalContext();
  const [{ data, meta }, isLoading, pagination] = useGetPurchases();
  const dispatch = useAppDispatch();

  const handleFilterChange = (value: AnyObject) => {
    dispatch(setPurchasesOrderFilter(value));
  };

  const handleAdd = () =>
    openModal({
      title: "Create Purchase Order",
      render: (close) => <PurchasesModal onClose={close} />,
      size: "90vw",
    });

  const handleAddOR = () =>
    openModal({
      title: "Add Payment",
      render: (close) => <PaymentsModal onClose={close} isPaymentPage />,
    });

  const renderItem = useCallback(
    (d: Purchases) => (
      <div className="flex items-center justify-between py-1.5">
        <div>{d?.invoice_no}</div>
        <PurchasesStatus status={d?.status} />
      </div>
    ),
    [],
  );

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <Title size="h3">Purchase Details ({meta?.total})</Title>
      <Flex className="flex-grow" columnGap={24}>
        <Flex
          direction="column"
          className="flex-grow max-w-xs min-w-max"
          w="100%"
          rowGap={5}
        >
          <RoleChecker nonSuperAdmin>
            <Flex columnGap={6}>
              <Button className="flex-1" color="teal" onClick={handleAdd}>
                Create
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                color="teal"
                onClick={handleAddOR}
              >
                Add Payment
              </Button>
            </Flex>
          </RoleChecker>
          <ListSearchFilter
            filterSelector={selectPurchaseOrderFilter}
            advanceFilterElement={PurchasesFilter}
            onChange={handleFilterChange}
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
                  <NoData message="No selected Purchase order" />
                </Paper>
              }
            />
            <Route path="/:id" element={<SelectedPurchases />} />
          </Routes>
        </Flex>
      </Flex>
    </ContainerWrapper>
  );
}

export default PurchasesItemContainer;
