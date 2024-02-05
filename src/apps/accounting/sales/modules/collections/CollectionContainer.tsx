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

import { setCollectionFilter } from "../../redux/salesSlice";
import { selectCollectionFilter } from "../../redux/selectors";

import InvoiceFilter from "./components/CollectionFilter";
import CollectionModal from "./components/CollectionModal";
import { useGetCollections } from "./hooks";
import SelectedCollection from "./SelectedCollection";
import { Collection } from "./types";

function CollectionContainer() {
  const openModal = useModalContext();
  const [{ data, meta }, isLoading, pagination] = useGetCollections();
  const dispatch = useAppDispatch();

  const handleFilterChange = (value: AnyObject) => dispatch(setCollectionFilter(value));

  const handleAddOR = () =>
    openModal({
      title: "Add Collection",
      render: (close) => <CollectionModal onClose={close} />,
      size: "900px",
    });

  const renderItem = useCallback(
    (d: Collection) => (
      <div className="flex items-center justify-between py-1.5">
        <div>{d?.official_receipt_no}</div>
      </div>
    ),
    [],
  );

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <Title size="h3">Collections ({meta?.total})</Title>
      <Flex className="flex-grow" columnGap={24}>
        <Flex direction="column" className="w-96" rowGap={5}>
          <RoleChecker nonSuperAdmin>
            <Flex columnGap={6}>
              <Button className="flex-1" color="teal" onClick={handleAddOR}>
                Add Collection
              </Button>
            </Flex>
          </RoleChecker>
          <ListSearchFilter
            advanceFilterElement={InvoiceFilter}
            onChange={handleFilterChange}
            filterSelector={selectCollectionFilter}
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
            <Route path="/:id" element={<SelectedCollection />} />
          </Routes>
        </Flex>
      </Flex>
    </ContainerWrapper>
  );
}

export default CollectionContainer;
