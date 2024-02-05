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

import { setInvoiceFilter } from "../../redux/salesSlice";
import { selectInvoiceFilter } from "../../redux/selectors";
import CollectionModal from "../collections/components/CollectionModal";

import InvoiceFilter from "./components/InvoiceFilter";
import InvoiceModal from "./components/InvoiceModal";
import InvoiceStatus from "./components/InvoiceStatus";
import { useGetInvoices } from "./hooks";
import SelectedInvoice from "./SelectedInvoice";
import { Invoice } from "./types";

function InvoiceContainer() {
  const openModal = useModalContext();
  const [{ data, meta }, isLoading, pagination] = useGetInvoices();
  const dispatch = useAppDispatch();

  const handleFilterChange = (value: AnyObject) => dispatch(setInvoiceFilter(value));

  const handleAdd = () =>
    openModal({
      title: "Create Invoice",
      render: (close) => <InvoiceModal onClose={close} />,
      size: "90vw",
    });

  const handleAddOR = () =>
    openModal({
      title: "Add Collection",
      render: (close) => <CollectionModal isInvoicePage onClose={close} />,
      size: "900px",
    });

  const renderItem = useCallback(
    (d: Invoice) => (
      <div className="flex items-center justify-between py-1.5">
        <div>{d?.invoice_no}</div>
        <InvoiceStatus status={d?.status} />
      </div>
    ),
    [],
  );

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <Title size="h3">Invoices ({meta?.total})</Title>
      <Flex className="flex-grow" columnGap={24}>
        <Flex direction="column" className="w-96" rowGap={5}>
          <RoleChecker nonSuperAdmin>
            <Flex columnGap={6}>
              <Button className="flex-1" color="teal" onClick={handleAdd}>
                Create Invoice
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                color="teal"
                onClick={handleAddOR}
              >
                Add Collection
              </Button>
            </Flex>
          </RoleChecker>
          <ListSearchFilter
            filterSelector={selectInvoiceFilter}
            advanceFilterElement={InvoiceFilter}
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
                  <NoData message="No selected invoice" />
                </Paper>
              }
            />
            <Route path="/:id" element={<SelectedInvoice />} />
          </Routes>
        </Flex>
      </Flex>
    </ContainerWrapper>
  );
}

export default InvoiceContainer;
